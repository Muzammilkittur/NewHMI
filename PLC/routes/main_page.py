from fastapi import APIRouter, HTTPException
from ..config import PLC_IP, log_folder
from ..utils.helpers import round_number
from ..pycomm3trunk import PlcTruckConnection
from pydantic import BaseModel

router = APIRouter()

plc = PlcTruckConnection(PLC_IP, log_folder)



# --------------------------Get Main Bot axis PLC----------------------------------------------------------------------------


@router.get("/main_bot_axis")
def main_bot_axis():
    result = {}
    retrieve_tags = ['Task.Retrieve.Station_Number', 'Task.Retrieve.Fork_Direction', 'Task.Retrieve.Bot_Z_Level', 'Task.Retrieve.Bot_Z_Position']
    storage_tags = ['Task.Storage.Station_Number', 'Task.Storage.Fork_Direction', 'Task.Storage.Bot_Z_Level', 'Task.Storage.Bot_Z_Position']
    other_tags = ['Task_Status']
    all_tags = retrieve_tags + storage_tags + other_tags

    max_no_of_bots = plc.read('maxNoOfBots').value
    result['maxNoOfBots'] = max_no_of_bots

    for i in range(1, 5):
        mover_ID = plc.read(f'Bot_MoverID[{i}].MMI_Mover_Status.Path_ID')
        result[f'Bot_MoverID{i}'] = round_number(mover_ID.value, 2)
        
        for tag in all_tags:
            if '.' in tag:
                tag_category = tag.split('.')[1]  # Retrieve or Storage
                tag_name = tag.split('.')[-1]  # Station_Number, Fork_Direction, etc.
                tag_value = plc.read(f'Mover_ID[{i}].{tag}')
                result[f'{tag_category.lower()}_{tag_name.lower()}_{i}'] = round_number(tag_value.value, 2)
            else:
                tag_value = plc.read(f'Mover_ID[{i}].{tag}')
                result[f'{tag.lower()}_{i}'] = round_number(tag_value.value, 2)

    return result



# --------------------------Get Main Indexer Lift PLC----------------------------------------------------------------------------

@router.get("/main_ind_lift")
def main_ind_lift():
    data = {}
    for i in range(1, 3): 
        indexer_tags = [
            f'EM0{i+1}_Lift_Indexer_HMI.Indexer_fault',
            f'XY1{i*2}1_Indexer.ActualPosition',
            f'EM0{i+1}_Lift_Indexer_HMI.Indexer_enable',
            f'EM0{i+1}_Lift_Indexer_HMI.Indexer_at_level_1_deg_0',
            f'EM0{i+1}_Lift_Indexer_HMI.Indexer_at_level_1_deg_90',
            f'EM0{i+1}_Lift_Indexer_HMI.Indexer_at_level_2_deg_0',
            f'EM0{i+1}_Lift_Indexer_HMI.Indexer_at_level_2_deg_90',
            f'EM0{i+1}_Lift_Indexer_HMI.Lift_axis_1_fault',
            f'EM0{i+1}_Lift_Indexer_HMI.Lift_axis_2_fault',
            f'EM0{i+1}_Lift_Indexer_HMI.Lift_axis_1_enable',
            f'EM0{i+1}_Lift_Indexer_HMI.Lift_axis_2_enable',
            f'XY1{i*2}1_Z{i}.ActualPosition'
        ]
        
    
        if i== 1:
            tag = 'LHS'
        else:
            tag= 'RHS'
        lift_tags = [
            f'I_LHS_Lift_at_home_pos',
            f'I_RHS_Lift_at_home_pos',
            f'I_LHS_Lift_down_end_limit',
            f'I_RHS_Lift_down_end_limit',
            f'I_LHS_Lift_up_end_limit',
            f'I_RHS_Lift_up_end_limit',
            
        ]
        
        for tag in indexer_tags:
            data[tag] = plc.read(tag).value
        
        
        for tag in lift_tags:
            data[tag] = plc.read(tag).value
    
    return data


# --------------------------Get Main Battery - Identification - Quick Stick PLC ----------------------------------------------------------------------------
 
@router.get("/main_batt_identi_QS")
def diag_digital_output():


    
    Available = plc.read('Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Available')
    Connected = plc.read('Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Connected')
    HCL_Operational = plc.read('Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_HighLevelContollerOperational')
    NC_Operational = plc.read('Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_NodeControllersOperational')
    Faulted = plc.read('Program:raM_Dvc_DH_MM.Sts.Faulted')

    # Bot Charging
    Mover1 = plc.read('Mover_ID[01].Bot_Charge_Percentage')   
    Mover2 = plc.read('Mover_ID[02].Bot_Charge_Percentage') 
    Bot_assigned1 = plc.read('Mover_ID[1].Bot_Assigned')
    Bot_assigned2 = plc.read('Mover_ID[2].Bot_Assigned')
    Bot_exit = plc.read('HMI_BotID_Exit')

    # Bot Identification
    Barcode1 = plc.read('HMI_Bot_Barcode_Data[1]')
    Barcode2 = plc.read('HMI_Bot_Barcode_Data[2]')
    Barcode3 = plc.read('HMI_Bot_Barcode_Data[3]')
    Barcode4 = plc.read('HMI_Bot_Barcode_Data[4]')

    MoverID1 = plc.read('HMI_MoverID_Bot[1]')
    MoverID2 = plc.read('HMI_MoverID_Bot[2]')
    MoverID3 = plc.read('HMI_MoverID_Bot[3]')
    MoverID4 = plc.read('HMI_MoverID_Bot[4]')

    M1_vel = plc.read('mPM_MovingPath[1].Cfg_Velocity')
    M2_vel = plc.read('mPM_MovingPath[2].Cfg_Velocity')

    # Button Status
    dummymover1 = plc.read('Mover_ID[01].Dummy_Mover')
    dummymover2 = plc.read('Mover_ID[02].Dummy_Mover')
    


    
    return {'Available': Available.value, 'Connected': Connected.value, 'HCL_Operational': HCL_Operational.value, 'NC_Operational': NC_Operational.value, 'Faulted': Faulted.value,
           'Mover1': round_number(Mover1.value, 2), 'Mover2': round_number(Mover2.value, 2), 'Bot_assigned1': round_number(Bot_assigned1.value, 2), 'Bot_assigned2': round_number(Bot_assigned2.value, 2), 'Bot_exit': round_number(Bot_exit.value, 2),
           'Barcode1': Barcode1.value, 'Barcode2': Barcode2.value, 'Barcode3': Barcode3.value, 'Barcode4': Barcode4.value, 
           'MoverID1': MoverID1.value, 'MoverID2': MoverID2.value, 'MoverID3': MoverID3.value, 'MoverID4': MoverID4.value, 
           'M1_vel': M1_vel.value, 'M2_vel': M2_vel.value,  'dummymover1': dummymover1.value, 'dummymover2': dummymover2.value,
            }

# -----------------------End---Get Main Battery - Identification - Quick Stick PLC ------------------------------------------











# ---------------------Main Page Post--------------------------------------------



class Main_page(BaseModel):
    mover_1: str
    mover_2: str

    botID_exit: str

    bot1_barcode : str
    bot2_barcode : str
    bot3_barcode : str
    bot4_barcode : str

@router.post("/post_main_page")
def update_botAxis(data: Main_page):


    mover_1 = data.mover_1
    mover_2 = data.mover_2

    botID_exit = data.botID_exit

    bot1_barcode = data.bot1_barcode
    bot2_barcode = data.bot2_barcode
    bot3_barcode = data.bot3_barcode
    bot4_barcode = data.bot4_barcode




    try:
        if mover_1 != '':
            plc.write(f'Mover_ID[01].Bot_Charge_Percentage', int(mover_1))
        if mover_2 != '':
            plc.write(f'Mover_ID[02].Bot_Charge_Percentage', int(mover_2))

        if botID_exit != '':
            plc.write(f'HMI_BotID_Exit', int(botID_exit))

        if bot1_barcode != '':
            plc.write(f'HMI_Bot_Barcode_Data[1]', str(bot1_barcode))
        if bot2_barcode != '':
            plc.write(f'HMI_Bot_Barcode_Data[2]', str(bot2_barcode))
        if bot3_barcode != '':
            plc.write(f'HMI_Bot_Barcode_Data[3]', str(bot3_barcode))
        if bot4_barcode != '':
            plc.write(f'HMI_Bot_Barcode_Data[4]', str(bot4_barcode))
        

        return {'ok': True}
    except Exception as e:
        return {'ok': False}


# -----------------------------end-Main Page Post---------------------------------------------------------------------------------
        




        





       

   # -----------------------------Main Page- Bot Exit Momentary Buttons--------------------------------------
tags = ['HMI_Bot_Exit', 'Machine_Reset_ON', 'Mover_ID[01].Dummy_Mover', 'Mover_ID[02].Dummy_Mover'
]
@router.post("/operate_plc/{tag}/{action}")
def operate_plc(tag: str, action: str):

    if tag not in tags:
        raise HTTPException(status_code=400, detail="Invalid tag.")


    try:
        if action == "press":
            plc.write(f'{tag}', 1)
            return {"message": f"Button for tag {tag} pressed. Command sent to PLC."}
        elif action == "release":
            plc.write(f'{tag}', 0)
            return {"message": f"Button for tag {tag} released. Tag value set to zero."}
        else:
            raise HTTPException(status_code=400, detail="Invalid action. Must be 'press' or 'release'.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -----------------------------------------------------------------------------------------------------------
        


# --------------------------Get - Main Bot Status ---------------------------------------------
@router.get("/Main_Bot_status")
def Main_bot_status(number=1, axis = 'X'):
    if type(number) == str:
       number = int(number)
    if type(axis) == str:
        axis = str(axis)
    axisdict = {'X':'X_axis', 'Y1': 'Y_axis_1', 'Y2': 'Y_axis_2', 'Z':'Z_axis'}


    # Bot Details
    bot_position = plc.read(f'MMI_vehicle_status[{number}].Position')
    enable = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_Status.Motor_Enabled')
    home = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_at_home_pos')
    fault = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_Fault')
    act_pos = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_actual_pos')

    
    return {
            # Bot Details
            'enable': enable.value,  'home': home.value,  'fault': fault.value, 
            'act_pos': round_number(act_pos.value, 2), 'bot_position' : round_number(bot_position.value, 2)
            
            }
# # --------------------------end -Get - Main PLC IO-------------------------------







 


  