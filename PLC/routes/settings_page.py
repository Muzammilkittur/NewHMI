from fastapi import APIRouter, HTTPException
from ..config import PLC_IP, log_folder
from ..utils.helpers import round_number
from ..pycomm3trunk import PlcTruckConnection
from pydantic import BaseModel


router = APIRouter()

plc = PlcTruckConnection(PLC_IP, log_folder)

def get_plc_values(bot_number, axis_types):
    axis_values = {}
    for axis in axis_types:
        for attr in axis_types[axis]:
            plc_tag = f'EM1{bot_number-1}_Bot_HMI.{axis}_{attr}'
            keys = attr.split(".")
            current = axis_values.setdefault(axis, {})
            for key in keys[:-1]:
                current = current.setdefault(key, {})
            current[keys[-1]] = round_number(plc.read(plc_tag).value, 2)
    return axis_values

@router.get("/settings_bot_axis")
def settings_bot_axis(bot: int = 1):
    axis_types = {
        "X_axis": ["Status.Motor_Enabled", "at_home_pos", "Fault", "actual_pos", "actual_velocity", "actual_current", "actual_torque", "Settings.move_speed", "Settings.move_acc", "Settings.move_dec", "hold_pos", "unhold_pos", "Settings.max_torque"],
        "Z_axis": ["Status.Motor_Enabled", "at_home_pos", "Fault", "actual_pos", "actual_velocity", "actual_current", "actual_torque", "Settings.move_speed", "Settings.move_acc", "Settings.move_dec", "Settings.target_pos", "Settings.max_torque"],
        "Y_axis": ["Settings.move_speed", "Settings.move_acc", "Settings.move_dec", "Double_deep_left_pos", "Double_deep_right_pos"],
        "Y_axis_1": ["Status.Motor_Enabled", "at_home_pos", "Fault", "actual_pos", "actual_velocity", "actual_current", "actual_torque", "Settings.max_torque"],
        "Y_axis_2": ["Status.Motor_Enabled", "at_home_pos", "Fault", "actual_pos", "actual_velocity", "actual_current", "actual_torque", "Settings.max_torque"]
    }
    
    plc_values = get_plc_values(bot, axis_types)
    
    return plc_values

def get_lift_indexer_values(lift_number, tags):
    values = {}
    for tag in tags:
        plc_tag = f'EM0{lift_number+1}_Lift_Indexer_HMI.{tag}'
        keys = tag.split(".")
        current = values
        for key in keys[:-1]:
            current = current.setdefault(key, {})
        current[keys[-1]] = round_number(plc.read(plc_tag).value, 2)
    return values

@router.get("/settings_indLift")
def lift_get_position(number: int = 1):
    tags = [
        "Indexer_enable", "Indexer_fault", "Indexer_Actual_Velocity", "Indexer_Actual_Position", 
        "Indexer_Settings.Move_speed", "Indexer_Settings.Move_acc", "Indexer_Settings.Move_dec", 
        "Indexer_servo_action_status", "Indexer_DC_bus_up_status", "Indexer_Physical_axis_fault", 
        "Indexer_Group_fault", "Indexer_at_level_1_deg_0", "Indexer_at_level_1_deg_90", 
        "Indexer_at_level_2_deg_0", "Indexer_at_level_2_deg_90", "Lift_axis_1_enable", "Lift_axis_2_enable", 
        "Lift_axis_1_fault", "Lift_axis_2_fault", "Lift_axis_1_Actual_Position", "Lift_axis_1_Actual_Velocity", 
        "Lift_axis_2_Actual_Position", "Lift_axis_2_Actual_Velocity", "Lift_Settings.Move_speed", 
        "Lift_Settings.Move_acc", "Lift_Settings.Move_dec", "Lift_axis_1_servo_action_status", 
        "Lift_axis_2_servo_action_status", "Lift_axis_1_DC_bus_up_status", "Lift_axis_2_DC_bus_up_status", 
        "Lift_axis_1_Physical_axis_fault", "Lift_axis_2_Physical_axis_fault", "Lift_axis_1_Group_fault", 
        "Lift_axis_2_Group_fault",
         
        "Indexer_Manual.Jog_speed", "Indexer_Manual.Jog_acc", "Indexer_Manual.Jog_dec", 
        "Indexer_Manual.Home_speed", "Indexer_Manual.Home_acc", "Indexer_Manual.Home_dec", "Indexer_Manual.Move_speed", 
        "Indexer_Manual.Move_acc", "Indexer_Manual.Move_dec", "Indexer_Manual.Move_pos", 
        "Indexer_Settings.Move_speed", "Indexer_Settings.Move_acc", "Indexer_Settings.Move_dec", 
        "Lift_Manual.Jog_speed", "Lift_Manual.Jog_acc", "Lift_Manual.Jog_dec", "Lift_Manual.Home_speed", 
        "Lift_Manual.Home_acc", "Lift_Manual.Home_dec", "Lift_Manual.Move_speed", "Lift_Manual.Move_acc", 
        "Lift_Manual.Move_dec", "Lift_Manual.Move_pos", "Lift_Settings.Move_speed", "Lift_Settings.Move_acc", 
        "Lift_Settings.Move_dec"
    ]
    
    lift_values = get_lift_indexer_values(number, tags)
    
    return lift_values

# -------------------Start--get- Settings STP --------------------------------------------------------------------


@router.get("/settings_STP")
def settings_STP():



    # Settings STP // Fork Arm safe travel Position
    bot1_safe = plc.read('ProgramUN10_Bot_AxisHMI_Y_Axis_Return_po')      # Program:UN10_Bot_Axis.HMI_Y_Axis_Return_Pos
    bot2_safe = plc.read('ProgramUN11_Bot_AxisHMI_Y_Axis_Return_po')      # Program:UN11_Bot_Axis.HMI_Y_Axis_Return_Pos
    bot3_safe = plc.read('ProgramUN12_Bot_AxisHMI_Y_Axis_Return_po')      # Program:UN12_Bot_Axis.HMI_Y_Axis_Return_Pos
    bot4_safe = plc.read('ProgramUN13_Bot_AxisHMI_Y_Axis_Return_po')      # Program:UN13_Bot_Axis.HMI_Y_Axis_Return_Pos

    bot1_retrieve = plc.read('ProgramUN10_Retrieve')      # Program:UN10_Bot_Axis.L_retrieve_tolerance
    bot2_retrieve = plc.read('ProgramUN11_Retrieve')      # Program:UN11_Bot_Axis.L_retrieve_tolerance
    bot3_retrieve = plc.read('ProgramUN12_Retrieve')      # Program:UN12_Bot_Axis.L_retrieve_tolerance
    bot4_retrieve = plc.read('ProgramUN13_Retrieve')      # Program:UN13_Bot_Axis.L_retrieve_tolerance

    bot1_QS = plc.read('ProgramUN10_QS')      # Program:EM09_Bot.Buffer_MoverID_Bot[1]
    bot2_QS = plc.read('ProgramUN11_QS')      # Program:EM09_Bot.Buffer_MoverID_Bot[2]
    bot3_QS = plc.read('ProgramUN12_QS')      # Program:EM09_Bot.Buffer_MoverID_Bot[3]
    bot4_QS = plc.read('ProgramUN13_QS')      # Program:EM09_Bot.Buffer_MoverID_Bot[4]

    

    
    return {'bot1_safe': round_number(bot1_safe.value, 2), 'bot2_safe':round_number(bot2_safe.value, 2), 'bot3_safe': round_number(bot3_safe.value, 2),
            'bot4_safe': round_number(bot4_safe.value, 2),
            'bot1_retrieve': round_number(bot1_retrieve.value, 2), 'bot2_retrieve':round_number(bot2_retrieve.value, 2),
            'bot3_retrieve': round_number(bot3_retrieve.value, 2), 'bot4_retrieve': round_number(bot4_retrieve.value, 2),
            'bot1_QS': round_number(bot1_QS.value, 2), 'bot2_QS':round_number(bot2_QS.value, 2),
            'bot3_QS': round_number(bot3_QS.value, 2), 'bot4_QS': round_number(bot4_QS.value, 2),
            
            }
# # --------------------------end -get- Settings STP--------------------------------


# ---------------------post_settings_STP Post--------------------------------------------



class Settings_STP(BaseModel):
    B1_safe: str
    B2_safe: str
    B3_safe: str
    B4_safe: str
    B1_retrieve: str
    B2_retrieve: str
    B3_retrieve: str
    B4_retrieve: str
    B1_Qstick: str
    B2_Qstick: str
    B3_Qstick: str
    B4_Qstick: str
  
@router.post("/post_settings_STP")
def post_settings_STP(data: Settings_STP):
    attributes = {
        'B1_safe': 'ProgramUN10_Bot_AxisHMI_Y_Axis_Return_po',
        'B2_safe': 'ProgramUN11_Bot_AxisHMI_Y_Axis_Return_po',
        'B3_safe': 'ProgramUN12_Bot_AxisHMI_Y_Axis_Return_po',
        'B4_safe': 'ProgramUN13_Bot_AxisHMI_Y_Axis_Return_po',
        'B1_retrieve': 'ProgramUN10_Retrieve',
        'B2_retrieve': 'ProgramUN11_Retrieve',
        'B3_retrieve': 'ProgramUN12_Retrieve',
        'B4_retrieve': 'ProgramUN13_Retrieve',
        'B1_Qstick': 'ProgramUN10_QS',
        'B2_Qstick': 'ProgramUN11_QS',
        'B3_Qstick': 'ProgramUN12_QS',
        'B4_Qstick': 'ProgramUN13_QS'
    }

    try:
        for attr, plc_code in attributes.items():
            value = getattr(data, attr)
            if value != '':
                plc.write(plc_code, int(value))

        return {'ok': True}
    except Exception as e:
        return {'ok': False}


# -------------------------end -post_settings_STP Post---------------------------------------------------------------------------------

        










# -------------------Start--get- Settings QS --------------------------------------------------------------------


@router.get("/settings_QS")
def settings_QS():
    # Read velocities
    same_velocities = {f'mover{i}_same': plc.read(f'Velocity[{i}]') for i in range(1, 5)}
    change_velocities = {f'mover{i}_change': plc.read(f'Mover_ID{i}Path_Change_Velocity') for i in range(1, 5)}

    # Round and prepare the response
    response = {}
    for key, value in same_velocities.items():
        response[key] = round_number(value.value, 2)
    for key, value in change_velocities.items():
        response[key] = round_number(value.value, 2)

    return response

# # --------------------------end -get- Settings QS--------------------------------


# ---------------------post_settings_QS Post--------------------------------------------



class Settings_QS(BaseModel):
    M1_same: str
    M2_same: str
    M3_same: str
    M4_same: str
    M1_change: str
    M2_change: str
    M3_change: str
    M4_change: str
  
@router.post("/post_settings_QS")
def post_settings_QS(data: Settings_QS):
    try:
        # Loop through same velocities
        for i in range(1, 5):
            same_attr = f'M{i}_same'
            same_value = getattr(data, same_attr)
            if same_value != '':
                plc.write(f'Velocity[{i}]', int(same_value))
        
        # Loop through change velocities
        for i in range(1, 5):
            change_attr = f'M{i}_change'
            change_value = getattr(data, change_attr)
            if change_value != '':
                plc.write(f'Mover_ID{i}Path_Change_Velocity', int(change_value))

        return {'ok': True}
    except Exception as e:
        return {'ok': False}

# -------------------------end -post_settings_QS Post---------------------------------------------------------------------------------




# ---------------------Settings IndLift bot axis Post--------------------------------------------



class Settings_indLift(BaseModel):
    ind_velocity: str
    ind_acceleration: str
    ind_deceleration: str
    lift_velocity: str
    lift_acceleration: str
    lift_deceleration: str

@router.post("/post_settings_indLift/{bot}")
def settings_indlift(data: Settings_indLift, bot: int = 1):
    if isinstance(bot, str):
        bot = int(bot)
    
    attributes = {
        'ind_velocity': 'Indexer_Settings.Move_speed',
        'ind_acceleration': 'Indexer_Settings.Move_acc',
        'ind_deceleration': 'Indexer_Settings.Move_dec',
        'lift_velocity': 'Lift_Settings.Move_speed',
        'lift_acceleration': 'Lift_Settings.Move_acc',
        'lift_deceleration': 'Lift_Settings.Move_dec'
    }
    
    try:
        for attr, suffix in attributes.items():
            value = getattr(data, attr)
            if value != '':
                plc.write(f'EM0{bot+1}_Lift_Indexer_HMI.{suffix}', int(value))
                
        return {'ok': True}
    except Exception as e:
        return {'ok': False}


# -----------------------------end Settings IndLift Post---------------------------------------------------------------------------------







# ---------------------Settings all bot axis Post--------------------------------------------



class Settings_botaxis(BaseModel):
    move_speed: str
    move_acceleration: str
    move_deceleration: str
    bin_hold_pos: str
    bin_unhold_pos: str
    max_torque: str
    BLmove_speed: str
    BLmove_acceleration: str
    BLmove_deceleration: str
    BLvertical_pos: str
    BAmove_speed: str
    BAmove_acceleration: str
    BAmove_deceleration: str
    operator_side_dd: str
    panel_side_dd: str
    BLmax_torque: str
    BA1max_torque: str
    BA2max_torque: str

@router.post("/post_settings_bot_axis/{bot}")
def update_Settings_botAxis(data: Settings_botaxis, bot: int = 1):
    if isinstance(bot, str):
        bot = int(bot)

    attributes = {
        'move_speed': 'X_axis_Settings.move_speed',
        'move_acceleration': 'X_axis_Settings.move_acc',
        'move_deceleration': 'X_axis_Settings.move_dec',
        'bin_hold_pos': 'X_axis_hold_pos',
        'bin_unhold_pos': 'X_axis_unhold_pos',
        'max_torque': 'X_axis_Settings.max_torque',
        'BLmove_speed': 'Z_axis_Settings.move_speed',
        'BLmove_acceleration': 'Z_axis_Settings.move_acc',
        'BLmove_deceleration': 'Z_axis_Settings.move_dec',
        'BLvertical_pos': 'Z_axis_Settings.target_pos',
        'BAmove_speed': 'Y_axis_Settings.move_speed',
        'BAmove_acceleration': 'Y_axis_Settings.move_acc',
        'BAmove_deceleration': 'Y_axis_Settings.move_dec',
        'operator_side_dd': 'Y_axis_Double_deep_left_pos',
        'panel_side_dd': 'Y_axis_Double_deep_right_pos',
        'BLmax_torque': 'Z_axis_Settings.max_torque',
        'BA1max_torque': 'Y_axis_1_Settings.max_torque',
        'BA2max_torque': 'Y_axis_2_Settings.max_torque'
    }

    try:
        for attr, suffix in attributes.items():
            value = getattr(data, attr)
            if value != '':
                plc.write(f'EM1{bot-1}_Bot_HMI.{suffix}', int(value))

        return {'ok': True}
    except Exception as e:
        return {'ok': False}


# -----------------------------end-Settings all bot axis Post---------------------------------------------------------------------------------
        


# --------------------------Get Settings Bypass Module PLC----------------------------------------------------------------------------


class BypassUpdate(BaseModel):
    tag_number: int

@router.get("/settingsBypassModule")
def settings_Bypass_Module():
    PackML_Bypass = []
    for i in range(32):
        tag_number = str(i)
        tag_name = f'PackML_Bypass[{tag_number}]'
        value = plc.read(tag_name).value
        custom_color = "#FA1203" if value == 1 else "#1FFC04"
        # description = f"Tag {tag_number} is {'active' if value == 1 else 'inactive'}"
        description = f"{'Bypassed' if value == 1 else 'Bypass'}"
        PackML_Bypass.append({
            "tag_number": tag_number,
            "value": value,
            "customColor": custom_color,
            "description": description
        })

    return PackML_Bypass


@router.post("/updateBypassModule")
def update_Bypass_Module(update: BypassUpdate):
    tag_name = f'PackML_Bypass[{update.tag_number}]'
    current_value = plc.read(tag_name).value
    new_value = 0 if current_value == 1 else 1
    plc.write(tag_name, new_value)
    return {"status": "success", "tag_number": update.tag_number, "new_value": new_value}



# -----------------------------Settings page- Ind-Lift- Momentary Buttons--------------------------------------
        

set_tags = ['Indexer_Settings.Enable', 'Indexer_Settings.Disable', 'Indexer_Settings.Reset', 'Indexer_Settings.Home',
            'Lift_Settings.Enable', 'Lift_Settings.Disable', 'Lift_Settings.Reset', 'Lift_Settings.Home',
]
@router.post("/settingsindLiftButton_plc/{set_tag}/{action}/{number}")
def settings_indLift_plc(set_tag: str, action: str, number = 1):
    if set_tag not in set_tags:
        raise HTTPException(status_code=400, detail="Invalid tag.")

    try:
        if action == "press":
            plc.write(f'EM0{int(number)+1}_Lift_Indexer_HMI.{set_tag}', 1)
            return {"message": f"Button for tag {set_tag} pressed. Command sent to PLC."}
        elif action == "release":
            plc.write(f'EM0{int(number)+1}_Lift_Indexer_HMI.{set_tag}', 0)
            return {"message": f"Button for tag {set_tag} released. Tag value set to zero."}
        else:
            raise HTTPException(status_code=400, detail="Invalid action. Must be 'press' or 'release'.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------------------------------------------------------------------------------------
