from fastapi import APIRouter, HTTPException
from ..config import PLC_IP, log_folder
from ..utils.helpers import round_number
from ..pycomm3trunk import PlcTruckConnection
from pydantic import BaseModel

router = APIRouter()

plc = PlcTruckConnection(PLC_IP, log_folder)

axis_dict = {
    'X': 'X_axis', 'Y1': 'Y_axis_1', 'Y2': 'Y_axis_2', 'Z': 'Z_axis'
}

def read_plc_values(bot, axis):
    axis_prefix = f'EM1{bot-1}_Bot_HMI.{axis_dict[axis]}'
    values = {
        'enabled_status': plc.read(f'{axis_prefix}_Status.Motor_Enabled'),
        'actual_velocity': plc.read(f'{axis_prefix}_actual_velocity'),
        'actual_position': plc.read(f'{axis_prefix}_actual_pos'),
        'actual_current': plc.read(f'{axis_prefix}_actual_current'),
        'actual_torque': plc.read(f'{axis_prefix}_actual_torque'),
        'fault': plc.read(f'{axis_prefix}_Fault'),
        'home_status': plc.read(f'{axis_prefix}_at_home_pos'),
        'max_torque': plc.read(f'{axis_prefix}_Manual.max_torque'),
        'target_pos': plc.read(f'{axis_prefix}_Manual.target_pos'),
        'jog_speed': plc.read(f'{axis_prefix}_Manual.jog_speed'),
        'jog_acc': plc.read(f'{axis_prefix}_Manual.jog_acc'),
        'jog_dec': plc.read(f'{axis_prefix}_Manual.jog_dec'),
        'home_speed': plc.read(f'{axis_prefix}_Manual.home_speed'),
        'home_acc': plc.read(f'{axis_prefix}_Manual.home_acc'),
        'home_dec': plc.read(f'{axis_prefix}_Manual.home_dec'),
        'move_speed': plc.read(f'{axis_prefix}_Manual.move_speed'),
        'move_acc': plc.read(f'{axis_prefix}_Manual.move_acc'),
        'move_dec': plc.read(f'{axis_prefix}_Manual.move_dec'),
    }
    return values

def read_plc_value(address: str, retries: int = 3):
    for _ in range(retries):
        try:
            return plc.read(address).value
        except Exception as e:
            print(f"Error reading {address}: {e}")
    raise HTTPException(status_code=500, detail=f"Failed to read {address} after {retries} retries")

def read_lift_values(number):
    number_str = f'EM0{number+1}_Lift_Indexer_HMI'

    indexer_keys = [
        'Mode', 'Indexer_enable', 'Indexer_fault', 'Indexer_Actual_Velocity',
        'Indexer_Actual_Position'
    ]

    lift_keys = [
        'Lift_axis_1_enable', 'Lift_axis_2_enable', 'Lift_axis_1_fault', 'Lift_axis_2_fault',
        'Lift_axis_1_Actual_Position', 'Lift_axis_1_Actual_Velocity', 'Lift_axis_2_Actual_Position',
        'Lift_axis_2_Actual_Velocity'
    ]

    indexer_manual_keys = [
        'Jog_speed', 'Jog_acc', 'Jog_dec', 'Home_speed', 'Home_acc', 'Home_dec',
        'Move_speed', 'Move_acc', 'Move_dec', 'Move_pos'
    ]

    lift_manual_keys = [
        'Jog_speed', 'Jog_acc', 'Jog_dec', 'Home_speed', 'Home_acc', 'Home_dec',
        'Move_speed', 'Move_acc', 'Move_dec', 'Move_pos'
    ]

    def read_values(base_str, keys):
        return {key: read_plc_value(f'{base_str}.{key}') for key in keys}

    indexer_values = read_values(number_str, indexer_keys)
    lift_values = read_values(number_str, lift_keys)

    indexer_manual_values = read_values(f'{number_str}.Indexer_Manual', indexer_manual_keys)
    lift_manual_values = read_values(f'{number_str}.Lift_Manual', lift_manual_keys)

    # Combine all values
    all_values = {
        'indexer': {**indexer_values, 'manual': indexer_manual_values},
        'lift': {**lift_values, 'manual': lift_manual_values}
    }

    # Apply rounding to the values
    def round_values(values):
        return {
            key: round_number(value, 2) if isinstance(value, (int, float)) else value
            for key, value in values.items()
        }

    # Round the indexer and lift values separately, including their manual values
    rounded_indexer_values = {**round_values(indexer_values), 'manual': round_values(indexer_manual_values)}
    rounded_lift_values = {**round_values(lift_values), 'manual': round_values(lift_manual_values)}

    # Return the combined rounded values
    return {
        'indexer': rounded_indexer_values,
        'lift': rounded_lift_values
    }

# --------------------------Get Manual Bot axis PLC----------------------------------------------------------------------------

@router.get("/manual_bot_axis")
def bot_axis(bot: int = 1, axis: str = 'X'):
    axis = str(axis)
    if axis not in axis_dict:
        raise HTTPException(status_code=400, detail="Invalid axis")

    plc_values = read_plc_values(bot, axis)

    return {
        'enabledstatus': plc_values['enabled_status'].value,
        'actualBot_velocity': round_number(plc_values['actual_velocity'].value, 2),
        'actualBot_position': round_number(plc_values['actual_position'].value, 2),
        'actualBot_current': round_number(plc_values['actual_current'].value, 2),
        'actualBot_torque': round_number(plc_values['actual_torque'].value, 2),
        'botfault': plc_values['fault'].value,
        'bothomestatus': plc_values['home_status'].value,
        'maxtorq': round_number(plc_values['max_torque'].value, 2),
        'targPos': round_number(plc_values['target_pos'].value, 2),
        'jogvel': round_number(plc_values['jog_speed'].value, 2),
        'jogacc': round_number(plc_values['jog_acc'].value, 2),
        'jogdec': round_number(plc_values['jog_dec'].value, 2),
        'homevel': round_number(plc_values['home_speed'].value, 2),
        'homeacc': round_number(plc_values['home_acc'].value, 2),
        'homedec': round_number(plc_values['home_dec'].value, 2),
        'movevel': round_number(plc_values['move_speed'].value, 2),
        'moveacc': round_number(plc_values['move_acc'].value, 2),
        'movedec': round_number(plc_values['move_dec'].value, 2),
    }

# -------------------------Get-Manual & Settings Indexer-Lift PLC----------------------------------------------------------------------------

@router.get("/manual_indLift")
def lift_get_position(number: int = 1):
    try:
        plc_values = read_lift_values(number)
        return plc_values
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




# -----------------------End - Indexer - Lift PLC --------------------------------------------------------------------



# ---------------------Manual bot axis Post--------------------------------------------



class ManualBotAxis(BaseModel):
    jog_speed: str
    jog_acceleration: str
    jog_deceleration: str
    home_speed: str
    home_acceleration: str
    home_deceleration: str
    move_speed: str
    move_acceleration: str
    move_deceleration: str
    max_torque: str
    target_pos: str

@router.post("/post_manual_bot_axis/{bot}/{axis}")
def update_bot_axis(data: ManualBotAxis, bot: int = 1, axis: str = 'X'):

    params = {
        'jog_speed': data.jog_speed,
        'jog_acc': data.jog_acceleration,
        'jog_dec': data.jog_deceleration,
        'home_speed': data.home_speed,
        'home_acc': data.home_acceleration,
        'home_dec': data.home_deceleration,
        'move_speed': data.move_speed,
        'move_acc': data.move_acceleration,
        'move_dec': data.move_deceleration,
        'max_torque': data.max_torque,
        'target_pos': data.target_pos,
    }

    bot = int(bot)

    try:
        for key, value in params.items():
            if value != '':
                plc.write(f'EM1{bot-1}_Bot_HMI.{axis_dict[axis]}_Manual.{key}', int(value))
        return {'ok': True}
    except Exception as e:
        return {'ok': False}



# -----------------------------end-Manual bot axis Post---------------------------------------------------------------------------------
        

# ----------------------------Manual Indexer Lift Post-------------------------------------------------------------------------------

class ManualIndLift(BaseModel):
    indjog_speed: str
    indjog_acceleration: str
    indjog_deceleration: str
    indhome_speed: str
    indhome_acceleration: str
    indhome_deceleration: str
    indmove_speed: str
    indmove_acceleration: str
    indmove_deceleration: str
    indmove_position: str
    liftjog_speed: str
    liftjog_acceleration: str
    liftjog_deceleration: str
    lifthome_speed: str
    lifthome_acceleration: str
    lifthome_deceleration: str
    liftmove_speed: str
    liftmove_acceleration: str
    liftmove_deceleration: str
    liftmove_position: str

@router.post("/post_manual_ind_lift/{selected_bot}")
def update_manual_ind_lift(selected_bot: int, data: ManualIndLift):
    ind_params = {
        'Indexer_Manual.Jog_speed': data.indjog_speed,
        'Indexer_Manual.Jog_acc': data.indjog_acceleration,
        'Indexer_Manual.Jog_dec': data.indjog_deceleration,
        'Indexer_Manual.Home_speed': data.indhome_speed,
        'Indexer_Manual.Home_acc': data.indhome_acceleration,
        'Indexer_Manual.Home_dec': data.indhome_deceleration,
        'Indexer_Manual.Move_speed': data.indmove_speed,
        'Indexer_Manual.Move_acc': data.indmove_acceleration,
        'Indexer_Manual.Move_dec': data.indmove_deceleration,
        'Indexer_Manual.Move_pos': data.indmove_position
    }

    lift_params = {
        'Lift_Manual.Jog_speed': data.liftjog_speed,
        'Lift_Manual.Jog_acc': data.liftjog_acceleration,
        'Lift_Manual.Jog_dec': data.liftjog_deceleration,
        'Lift_Manual.Home_speed': data.lifthome_speed,
        'Lift_Manual.Home_acc': data.lifthome_acceleration,
        'Lift_Manual.Home_dec': data.lifthome_deceleration,
        'Lift_Manual.Move_speed': data.liftmove_speed,
        'Lift_Manual.Move_acc': data.liftmove_acceleration,
        'Lift_Manual.Move_dec': data.liftmove_deceleration,
        'Lift_Manual.Move_pos': data.liftmove_position
    }

    try:
        for key, value in ind_params.items():
            if value:
                plc.write(f'EM0{selected_bot+1}_Lift_Indexer_HMI.{key}', int(value))
        
        for key, value in lift_params.items():
            if value:
                plc.write(f'EM0{selected_bot+1}_Lift_Indexer_HMI.{key}', int(value))
                
        return {'ok': True}
    except Exception as e:
        return {'ok': False, 'error': str(e)}


# -----------------------------Manual page- Bot Axis-JOG HOME MOVE Momentary Buttons--------------------------------------
bot_tags = ['Cmd_enable', 'Cmd_disable',
    'Cmd_jog_fwd',
    'Cmd_jog_rev',
    'Cmd_move',
    'Cmd_home',
    'Cmd_reset',
]
@router.post("/manual_bot_plc/{tag}/{action}/{bot}/{axis}")
def manual_bot_plc(tag: str, action: str, bot = 1, axis='X'):
    axisdict = {'X':'X_axis', 'Y1': 'Y_axis_1', 'Y2': 'Y_axis_2', 'Z':'Z_axis'}
    if tag not in bot_tags:
        raise HTTPException(status_code=400, detail="Invalid tag.")


    try:
        if action == "press":
            plc.write(f'EM1{int(bot)-1}_Bot_HMI.{axisdict[axis]}_Manual.{tag}', 1)
            return {"message": f"Button for tag {tag} pressed. Command sent to PLC."}
        elif action == "release":
            plc.write(f'EM1{int(bot)-1}_Bot_HMI.{axisdict[axis]}_Manual.{tag}', 0)
            return {"message": f"Button for tag {tag} released. Tag value set to zero."}
        else:
            raise HTTPException(status_code=400, detail="Invalid action. Must be 'press' or 'release'.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------------------------------------------------------------------------------------------------
 

# -----------------------------Manual page- Ind-Lift-JOG HOme MOVE Momentary Buttons--------------------------------------
        

indtags = [
    'Indexer_Manual.Enable', 'Indexer_Manual.Disable', 'Indexer_Manual.Jog_Fwd', 'Indexer_Manual.Jog_Rev',
    'Indexer_Manual.Move', 'Indexer_Manual.Home', 'Indexer_Manual.Reset',
    'Lift_Manual.Enable', 'Lift_Manual.Disable', 'Lift_Manual.Jog_Fwd', 'Lift_Manual.Jog_Rev',
    'Lift_Manual.Move', 'Lift_Manual.Home', 'Lift_Manual.Reset', 
    'Mode',
]

@router.post("/indLiftButton_plc/{indtag}/{action}/{number}")
async def indLift_plc(indtag: str, action: str, number: int = 1):
    if indtag not in indtags:
        raise HTTPException(status_code=400, detail="Invalid tag.")
    
    # Map the action to the corresponding PLC value
    action_mapping = {
        "press": 1,
        "release": 0
    }
    
    if action not in action_mapping:
        raise HTTPException(status_code=400, detail="Invalid action. Must be 'press', 'press2', 'press3', or 'release'.")
    
    try:
        plc_value = action_mapping[action]
        plc.write(f'EM0{int(number)+1}_Lift_Indexer_HMI.{indtag}', plc_value)
        return {"message": f"Button for tag {indtag} {action}. Command sent to PLC."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class TabUpdate(BaseModel):
    tab_value: int

@router.post("/indLiftTab/{number}")
async def indLiftTab(number: int, tab_update: TabUpdate):
    if tab_update.tab_value not in [1, 2, 3]:
        raise HTTPException(status_code=400, detail="Invalid tab value. Must be 1, 2, or 3.")
    
    try:
        plc.write(f'EM0{number+1}_Lift_Indexer_HMI.Mode', tab_update.tab_value)
        return {"message": f"Tab value {tab_update.tab_value} updated for PLC tag 'EM0{number+1}_Lift_Indexer_HMI.Mode'."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------------------------------------------------------------------------
        












# -------------------Manual Quick Stick Get--------------------------------------------------------------------

def read_value(tag: str):
    return plc.read(tag).value

@router.get("/manual_quickStick")
def quick_stick():
    tags = {
        'upstream_link': 'MMI_path_status[1].Upstream_Link_Status',
        'downstream_link': 'MMI_path_status[1].Downstream_Link_Status',
        'path_state': 'MMI_path_status[1].Path_State',
        'path_movement': 'MMI_path_status[1].Path_Movement_Status',
        'Path_ID1': 'Mover_ID[1].MMI_Mover_Status.Path_ID',
        'Path_ID2': 'Mover_ID[2].MMI_Mover_Status.Path_ID',
        'Path_ID3': 'Mover_ID[3].MMI_Mover_Status.Path_ID',
        'Path_ID4': 'Mover_ID[4].MMI_Mover_Status.Path_ID',
        'Path_position1': 'Mover_ID[1].MMI_Mover_Status.Position',
        'Path_position2': 'Mover_ID[2].MMI_Mover_Status.Position',
        'Path_position3': 'Mover_ID[3].MMI_Mover_Status.Position',
        'Path_position4': 'Mover_ID[4].MMI_Mover_Status.Position',
        'startuppathid': 'EM01_Manual_Functions.Startup_Target_Path',
        'movemoverpid': 'EM01_Manual_Functions.Move_Mover_ID',
        'targetpid': 'EM01_Manual_Functions.Move_Path_ID',
        'position': 'EM01_Manual_Functions.Move_Position',
        'velocity': 'EM01_Manual_Functions.Move_Velocity',
        'acceleration': 'EM01_Manual_Functions.Move_Acceleration',
        'pid': 'EM01_Manual_Functions.Move_PID',
        'linknode': 'EM01_Manual_Functions.Link_Node',
        'controlpath': 'EM01_Manual_Functions.Link_Control_Path',
        'peerpath': 'EM01_Manual_Functions.Link_Peer_Path',
        'linkmoverid': 'EM01_Manual_Functions.Link_Mover_ID',
        'moveridbot1': 'HMI_MoverID_Bot[1]',
        'moveridbot2': 'HMI_MoverID_Bot[2]',
        'moveridbot3': 'HMI_MoverID_Bot[3]',
        'moveridbot4': 'HMI_MoverID_Bot[4]',
        'movebutton': 'EM01_Manual_Functions.Cmd_Move'
    }

    response = {key: read_value(tag) for key, tag in tags.items()}

    return response




# ---------------------Manual Quick Stick Post--------------------------------------------



class Manual_QuickStick(BaseModel):
    startup_path: str
    move_moverPID: str
    target_PID: str
    pos: str
    vel: str
    accel: str
    Pid: str
    lin_nod: str
    cont_path: str
    pee_path: str
    lin_movID: str
    movID_bot1: str
    movID_bot2: str
    movID_bot3: str
    movID_bot4: str

@router.post("/post_update_manualQS")
def update_Manual_QuickStick(data: Manual_QuickStick):
    attributes = {
        'startup_path': 'EM01_Manual_Functions.Startup_Target_Path',
        'move_moverPID': 'EM01_Manual_Functions.Move_Mover_ID',
        'target_PID': 'EM01_Manual_Functions.Move_Path_ID',
        'pos': 'EM01_Manual_Functions.Move_Position',
        'vel': 'EM01_Manual_Functions.Move_Velocity',
        'accel': 'EM01_Manual_Functions.Move_Acceleration',
        'Pid': 'EM01_Manual_Functions.Move_PID',
        'lin_nod': 'EM01_Manual_Functions.Link_Node',
        'cont_path': 'EM01_Manual_Functions.Link_Control_Path',
        'pee_path': 'EM01_Manual_Functions.Link_Peer_Path',
        'lin_movID': 'EM01_Manual_Functions.Link_Mover_ID',
        'movID_bot1': 'HMI_MoverID_Bot[1]',
        'movID_bot2': 'HMI_MoverID_Bot[2]',
        'movID_bot3': 'HMI_MoverID_Bot[3]',
        'movID_bot4': 'HMI_MoverID_Bot[4]'
    }

    try:
        for attr, plc_address in attributes.items():
            value = getattr(data, attr)
            if value != '':
                plc.write(plc_address, int(value))
        
        return {'ok': True}
    except Exception as e:
        return {'ok': False}

# -------------------------end - Manual Quick Stick Post---------------------------------------------------------------------------------
        



# -----------------------------Manual page- QuickStick- Momentary Buttons--------------------------------------
Tagdict = {
    'Move': 'EM01_Manual_Functions.Cmd_Move',
    'Startup': 'EM01_Manual_Functions.Cmd_Startup',
    'Stop': 'EM01_Manual_Functions.Cmd_Stop',
    'Resume': 'EM01_Manual_Functions.Cmd_Resume',
    'Suspend': 'EM01_Manual_Functions.Cmd_Suspend',
    'PathReset': 'EM01_Manual_Functions.Cmd_Path_Reset',
    'ResetTargetPath': 'EM01_Manual_Functions.Reset_Trarget_Path',
    'CmdLink': 'EM01_Manual_Functions.Cmd_Link',
    'CmdUnlink': 'Program:EM01_MM_CMD.Cmd_MM_MPUnlink'
}


tagsQS = [ 'Move', 'Startup', 'Stop', 'Resume', 'Suspend', 'PathReset', 'ResetTargetPath', 'CmdLink', 'CmdUnlink']

@router.post("/manualQS_plc/{tag}/{action}")
def manualQS_plc(tag: str, action: str):
    if tag not in tagsQS:
        raise HTTPException(status_code=400, detail="Invalid tag.")


    try:
        if action == "press":
            plc.write(Tagdict[tag], 1)
            return {"message": f"Button for tag {tag} pressed. Command sent to PLC."}
        elif action == "release":
            plc.write(Tagdict[tag], 0)
            return {"message": f"Button for tag {tag} released. Tag value set to zero."}
        else:
            raise HTTPException(status_code=400, detail="Invalid action. Must be 'press' or 'release'.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------------------------------------------------------------------------




# --------------------------Get Manual PackML  PLC----------------------------------------------------------------------------

@router.get("/manual_packML")
def manual_PackML():

    
    equipment_fault = plc.read('Program:Main_Unit_Module.FLT_EquipmentModule')
    sState = plc.read('Program:Main_Unit_Module._sState')
    status_idle = plc.read('Program:Main_Unit_Module.StateModel.Sts_Idle')
    status_execute = plc.read('Program:Main_Unit_Module.StateModel.Sts_Execute')
    status_aborting = plc.read('Program:Main_Unit_Module.StateModel.Sts_Aborting')
    status_aborted = plc.read('Program:Main_Unit_Module.StateModel.Sts_Aborted')
    status_cleaning = plc.read('Program:Main_Unit_Module.StateModel.Sts_Clearing')
    status_stopped = plc.read('Program:Main_Unit_Module.StateModel.Sts_Stopped')
    status_resetting = plc.read('Program:Main_Unit_Module.StateModel.Sts_Resetting')
    B1_task_status = plc.read('Mover_ID[1].Task_Status')
    B2_task_status = plc.read('Mover_ID[2].Task_Status')
    lift1_pos = plc.read('Program:XYZ121_MP.Lift_Indexer_CMD.Lift_axis_1_Actual_Position')
    lift2_pos = plc.read('Program:XYZ141_MP.Lift_Indexer_CMD.Lift_axis_1_Actual_Position')
    mover1_seq = plc.read('Mover_ID[1].Mover_Running_Seq')
    mover2_seq = plc.read('Mover_ID[2].Mover_Running_Seq')
    # Button Status
    dummymover1 = plc.read('Mover_ID[01].Dummy_Mover')
    dummymover2 = plc.read('Mover_ID[02].Dummy_Mover')
    machinereseton = plc.read('Machine_Reset_ON')
    qsreset = plc.read('Program:EM01_MM_CMD.EM_Resetting_Required')
    bot1retrieve = plc.read('Mover_ID[01].ForkBot.Input.Double_Left_Retrieval_Done')
    bot2retrieve = plc.read('Mover_ID[02].ForkBot.Input.Double_Left_Retrieval_Done')
    bot1store = plc.read('Mover_ID[01].ForkBot.Input.Double_Left_Storage_Done')
    bot2store = plc.read('Mover_ID[02].ForkBot.Input.Double_Left_Storage_Done')
    Auto = plc.read('Push_Button.Auto')
    Manual = plc.read('Push_Button.Manual')

    
    return {'equipmentfault': equipment_fault.value, 'sState':sState.value, 'statusidle': status_idle.value, 'statusexecute':status_execute.value,
            'statusaborting': status_aborting.value, 'statusaborted': status_aborted.value, 'statuscleaning': status_cleaning.value,
            'statusstopped': status_stopped.value, 'statusresetting': status_resetting.value, 'B1taskstatus': B1_task_status.value, 'B2taskstatus': B2_task_status.value,
            'lift1pos': round_number(lift1_pos.value, 2), 'lift2pos': round_number(lift2_pos.value, 2),
            'mover1seq': round_number(mover1_seq.value, 2), 'mover2seq': round_number(mover2_seq.value, 2),
            # Button Status
            'dummymover1':dummymover1.value, 'dummymover2':dummymover2.value, 'machinereseton':machinereseton.value, 'qsreset':qsreset.value,
            'bot1retrieve':bot1retrieve.value, 'bot2retrieve':bot2retrieve.value, 'bot1store':bot1store.value, 'bot2store':bot2store.value,
            'auto':Auto.value, 'manual':Manual.value,
            }





# -----------------------------Manual page- PackML Momentary Buttons--------------------------------------
ButtonTagdict = {'MachineResetOn': 'Machine_Reset_ON',
                 'DummyMover1': 'Mover_ID[01].Dummy_Mover',
                 'DummyMover2': 'Mover_ID[02].Dummy_Mover',
                'RetrievalDone1': 'Mover_ID[01].ForkBot.Input.Double_Left_Retrieval_Done', 
                'RetrievalDone2': 'Mover_ID[02].ForkBot.Input.Double_Left_Retrieval_Done',
                'StorageDone1': 'Mover_ID[01].ForkBot.Input.Double_Left_Storage_Done',
                'StorageDone2': 'Mover_ID[02].ForkBot.Input.Double_Left_Storage_Done',
                'QSReset': 'Program:EM01_MM_CMD.EM_Resetting_Required',
                'Auto':'Push_Button.Auto', 
                'Manual':'Push_Button.Manual',
                'Start':'Push_Button.Start',
                'Stop': 'Push_Button.Stop',
                'Reset': 'Push_Button.Reset',
                'EmergencyStop': 'Push_Button.Emergency_Stop'}


tagsPackML = [ 'MachineResetOn','DummyMover1','DummyMover2', 'RetrievalDone1', 'RetrievalDone2', 'StorageDone1', 'StorageDone2','QSReset', 'Auto', 'Manual', 'Start', 'Stop', 'Reset', 'EmergencyStop']

@router.post("/manualPackML_plc/{tag}/{action}")
def manualPackML_plc(tag: str, action: str):
    if tag not in tagsPackML:
        raise HTTPException(status_code=400, detail="Invalid tag.")


    try:
        if action == "press":
            plc.write(ButtonTagdict[tag], 1)
            return {"message": f"Button for tag {tag} pressed. Command sent to PLC."}
        elif action == "press0":
            plc.write(ButtonTagdict[tag], 0)
            return {"message": f"Button for tag {tag} pressed 0. Command sent to PLC."}
        elif action == "release":
            plc.write(ButtonTagdict[tag], 0)
            return {"message": f"Button for tag {tag} released. Tag value set to zero."}
        else:
            raise HTTPException(status_code=400, detail="Invalid action. Must be 'press' or 'release'.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------------------------------------------------------------------------------------------------
        
