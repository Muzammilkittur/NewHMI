from fastapi import APIRouter
from ..config import PLC_IP, log_folder
from ..utils.helpers import round_number
from ..pycomm3trunk import PlcTruckConnection


router = APIRouter()

plc = PlcTruckConnection(PLC_IP, log_folder)

    
@router.get("/diagnostics_indlift/{number}")
def bot_axis(number: int):

    three, four = None, None

    if number == 1:
        three, four = 2, 2
    elif number == 2:
        three, four = 3, 4
   
    # Indexer
    ind_enabled = plc.read(f'EM0{number+1}_Lift_Indexer_HMI.Indexer_enable') 
    ind_position = plc.read(f'XY1{four}1_Indexer.ActualPosition')
    ind_velocity = plc.read(f'XY1{four}1_Indexer.ActualVelocity')
    ind_phy_fault = plc.read(f'XY1{four}1_Indexer.PhysicalAxisFault')
    ind_group_fault = plc.read(f'XY1{four}1_IndexerGroupFault')
    ind_servo_action = plc.read(f'XY1{four}1_Indexer.ServoActionStatus')
    ind_servo_status = plc.read(f'XY1{four}1_Indexer.DriveEnableStatus')
    ind_DC_bus = plc.read(f'XY1{four}1_Indexer.DCBusUpStatus')
    ind_level1_deg0 = plc.read(f'EM0{three}_Lift_Indexer_HMI.Indexer_at_level_1_deg_0')
    ind_level1_deg90 = plc.read(f'EM0{three}_Lift_Indexer_HMI.Indexer_at_level_1_deg_90')
    ind_level2_deg0 = plc.read(f'EM0{three}_Lift_Indexer_HMI.Indexer_at_level_2_deg_0')
    ind_level2_deg90 = plc.read(f'EM0{three}_Lift_Indexer_HMI.Indexer_at_level_2_deg_90')
    # # Axis 1
    axis1_enabled = plc.read(f'EM0{number+1}_Lift_Indexer_HMI.Lift_axis_1_enable')
    axis1_position = plc.read(f'XY1{four}1_Z1.ActualPosition')
    axis1_velocity = plc.read(f'XY1{four}1_Z1.ActualVelocity')
    axis1_phy_fault = plc.read(f'XY1{four}1_Z1.PhysicalAxisFault')
    axis1_group_fault = plc.read(f'XY1{four}1_Z1.GroupFault')
    axis1_servo_action = plc.read(f'XY1{four}1_Z1.ServoActionStatus')
    axis1_servo_status = plc.read(f'XY1{four}1_Z1.DriveEnableStatus')
    axis1_DC_bus = plc.read(f'XY1{four}1_Z1.DCBusUpStatus')
    axis1_home = plc.read(f'XY1{four}1_Z1.AxisHomedStatus')
    # axis 2
    axis2_enabled = plc.read(f'EM0{number+1}_Lift_Indexer_HMI.Lift_axis_2_enable')
    axis2_position = plc.read(f'XY1{four}1_Z2.ActualPosition')
    axis2_velocity = plc.read(f'XY1{four}1_Z2.ActualVelocity')
    axis2_phy_fault = plc.read(f'XY1{four}1_Z2.PhysicalAxisFault')
    axis2_group_fault = plc.read(f'XY1{four}1_Z2.GroupFault')
    axis2_servo_action = plc.read(f'XY1{four}1_Z2.ServoActionStatus')
    axis2_servo_status = plc.read(f'XY1{four}1_Z2.DriveEnableStatus')
    axis2_DC_bus = plc.read(f'XY1{four}1_Z2.DCBusUpStatus')
    axis2_home = plc.read(f'XY1{four}1_Z2.AxisHomedStatus')
    
    

    
    return {'ind_enabled': ind_enabled.value, 'axis1_enabled': axis1_enabled.value, 'axis2_enabled': axis2_enabled.value,
            'indposition': round_number(ind_position.value, 2), 'indvelocity': round_number(ind_velocity.value, 2), 'indphyfault': ind_phy_fault.value,
            'ind_group_fault': ind_group_fault.value, 'ind_servo_action': ind_servo_action.value, 'ind_servo_status': ind_servo_status.value,
            'ind_DC_bus': ind_DC_bus.value, 'ind_level1_deg0': ind_level1_deg0.value, 'ind_level1_deg90': ind_level1_deg90.value,
            'ind_level2_deg0': ind_level2_deg0.value, 'ind_level2_deg90': ind_level2_deg90.value,
            # axis 1
            'axis1_position': round_number(axis1_position.value, 2), 'axis1_velocity': round_number(axis1_velocity.value, 2), 'axis1_phy_fault': axis1_phy_fault.value,
            'axis1_group_fault': axis1_group_fault.value, 'axis1_servo_action': axis1_servo_action.value, 'axis1_servo_status': axis1_servo_status.value,
            'axis1_DC_bus': axis1_DC_bus.value, 'axis1_home': axis1_home.value,
            # axis 2
            'axis2_position': round_number(axis2_position.value, 2), 'axis2_velocity': round_number(axis2_velocity.value, 2), 'axis2_phy_fault': axis2_phy_fault.value,
            'axis2_group_fault': axis2_group_fault.value, 'axis2_servo_action': axis2_servo_action.value, 'axis2_servo_status': axis2_servo_status.value,
            'axis2_DC_bus': axis2_DC_bus.value, 'axis2_home': axis2_home.value,
            
            
            }

# ----------------------------End----------------------------------------------------------


# --------------------------get- Diagnostics PLC IO--------------------------------

@router.get("/diagnostics_plcIO")
def bot_axis(number=1, axis = 'X'):
    if type(number) == str:
       number = int(number)
    if type(axis) == str:
        axis = str(axis)




    # PLC IO
    emergency_stop = plc.read(f'EM1{number-1}_Bot_HMI.IO.Fault_lamp')
    start = plc.read(f'EM1{number-1}_Bot_HMI.IO.STO_on')
    lift_home = plc.read(f'EM1{number-1}_Bot_HMI.IO.Z_axis_at_home')
    over_travel = plc.read(f'EM1{number-1}_Bot_HMI.IO.Z_axis_end_limit')
    fork_arm1_home = plc.read(f'EM1{number-1}_Bot_HMI.IO.Y_axis_1_at_home')
    fork_arm2_home = plc.read(f'EM1{number-1}_Bot_HMI.IO.Y_axis_2_at_home')
    fork_arm1_LH = plc.read(f'EM1{number-1}_Bot_HMI.IO.Y_axis_1_at_left')
    fork_arm2_LH = plc.read(f'EM1{number-1}_Bot_HMI.IO.Y_axis_2_at_left')
    fork_arm1_RH = plc.read(f'EM1{number-1}_Bot_HMI.IO.Y_axis_1_at_right')
    fork_arm2_RH = plc.read(f'EM1{number-1}_Bot_HMI.IO.Y_axis_2_at_right')
    width_adjust_home = plc.read(f'EM1{number-1}_Bot_HMI.IO.X_axis_at_home')
    width_adjust_end = plc.read(f'EM1{number-1}_Bot_HMI.IO.X_axis_end_limit')
    bin_present = plc.read(f'EM1{number-1}_Bot_HMI.IO.Bin_present')

    

    
    return {'emergency_stop':emergency_stop.value, 'start':start.value, 'lift_home':lift_home.value, 'over_travel':over_travel.value,
            'fork_arm1_home':fork_arm1_home.value, 'fork_arm2_home':fork_arm2_home.value, 'fork_arm1_LH':fork_arm1_LH.value, 'fork_arm2_LH':fork_arm2_LH.value,
            'fork_arm1_RH':fork_arm1_RH.value, 'fork_arm2_RH':fork_arm2_RH.value, 'width_adjust_home':width_adjust_home.value, 'width_adjust_end':width_adjust_end.value,
            'bin_present':bin_present.value, 
            }
# # --------------------------end -get- Diagnostics PLC IO--------------------------------

@router.get("/diagnostics_Bot_Details")
def Diagnostic_bot_details(number=1, axis = 'X'):
    if type(number) == str:
       number = int(number)
    if type(axis) == str:
        axis = str(axis)
    axisdict = {'X':'X_axis', 'Y1': 'Y_axis_1', 'Y2': 'Y_axis_2', 'Z':'Z_axis'}


    # Bot Details
    enable = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_Status.Motor_Enabled')
    home = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_at_home_pos')
    fault = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_Fault')
    act_pos = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_actual_pos')
    act_vel = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_actual_velocity')
    act_current = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_actual_current')
    act_torque = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_actual_torque')
    act_temp = plc.read(f'EM1{number-1}_Bot_HMI.{axisdict[axis]}_temp')

    
    return {
            # Bot Details
            'enable': enable.value,  'home': home.value,  'fault': fault.value, 
            'act_pos': round_number(act_pos.value, 2), 'act_vel': round_number(act_vel.value, 2), 'act_current': round_number(act_current.value, 2),
            'act_torque': round_number(act_torque.value, 2), 'act_temp': round_number(act_temp.value, 2),
            
            }
# # --------------------------end -get- Diagnostics PLC IO--------------------------------



# --------------------------get- Diagnostics Quick Stick--------------------------------

@router.get("/diagnostics_QuickStick")
def Quick_Stick():

    #  Diagnostic Quick Stick
    initializing = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Initializing') # change tag. 
    disconnected = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Disconnected')
    connected = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Connected')
    idle = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Idle')
    faulted = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Faulted')
    hlcOperational = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_HighLevelContollerOperational')
    ncOperational = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_NodeControllersOperational')
    connecting = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Connecting')
    disconnecting = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Disconnecting')
    configuring = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Configuring')
    alarm = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Alarm')
    ready = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_Available')
    errorCode = plc.read(f'Program:EM01_MM_CMD.mStartup_DeviceStatus.Sts_ERR')
    


    


    
    return {'initializing':initializing.value, 'disconnected':disconnected.value, 'connected':connected.value, 'idle':idle.value,
            'faulted':faulted.value, 'hlcOperational':hlcOperational.value, 'ncOperational':ncOperational.value, 'connecting':connecting.value,
            'disconnecting':disconnecting.value, 'configuring':configuring.value, 'alarm':alarm.value, 'ready':ready.value,
            'errorCode': round_number(errorCode.value, 2),
            
            }



# -------------------------end--get- Diagnostics Quick Stick-------------------------------------


# -------------------Start--get- Diagnostics Digital Input--------------------------------------------------------------------
        

@router.get("/diagnostics_ditital_input")
def diag_digital_input():

    # Module 1
    m1_liftcontrol_on = plc.read('I_RHS_Lift_Control_On')
    m1_qscontrol_on = plc.read('I_RHS_QS_Control_On')
    m1_lifthomepos = plc.read('I_RHS_Lift_at_home_pos')
    m1_liftdownpos = plc.read('I_RHS_Lift_down_end_limit')
    m1_liftuppos = plc.read('I_RHS_Lift_up_end_limit')
    m1_enteryside_level1 = plc.read('I_RHS_Lift_at_level_1_deg_90')
    m1_lift_level1 = plc.read('I_RHS_Lift_at_level_1_deg_0')
    m1_lift_level2 = plc.read('I_RHS_Lift_at_level_2_deg_0')
    m1_index_entery = plc.read('I_RHS_Part_present_at_indexer_entry')
    m1_index_exit = plc.read('I_RHS_Part_present_at_indexer_exit')
    m1_auto = plc.read('Push_Button.Auto')
    m1_manual = plc.read('Push_Button.Manual')
    m1_start = plc.read('Push_Button.Start')
    m1_stop = plc.read('Push_Button.Stop')
    m1_reset = plc.read('Push_Button.Reset')
    m1_emergency_reset = plc.read('Push_Button.Emergency_reset')
    m1_emergency_stop = plc.read('Push_Button.Emergency_Stop')
    m1_emergency_stop1 = plc.read('Push_Button.Line_emergency_stop_1')
    m1_emergency_stop2 = plc.read('Push_Button.Line_emergency_stop_2')
    m1_emergency_stop3 = plc.read('Push_Button.Line_emergency_stop_3')
    m1_emergency_stop4 = plc.read('Push_Button.Line_emergency_stop_4')
    # Module 2
    m2_liftcontrol_on = plc.read('I_LHS_Lift_Control_On')
    m2_qscontrol_on = plc.read('I_LHS_QS_Control_On')
    m2_lifthomepos = plc.read('I_LHS_Lift_at_home_pos')
    m2_liftdownpos = plc.read('I_LHS_Lift_down_end_limit')
    m2_liftuppos = plc.read('I_LHS_Lift_up_end_limit')
    m2_lift_level1 = plc.read('I_LHS_Lift_at_level_1_deg_0')
    m2_lift_level2 = plc.read('I_LHS_Lift_at_level_2_deg_0')
    m2_index_entery = plc.read('I_LHS_Part_present_at_indexer_entry')
    m2_index_exit = plc.read('I_LHS_Part_present_at_indexer_exit')
    


    
    return {'m1_liftcontrol_on': m1_liftcontrol_on.value, 'm1_qscontrol_on': m1_qscontrol_on.value,'m1_liftcontrol_on': m1_liftcontrol_on.value,
            'm1_lifthomepos': m1_lifthomepos.value, 'm1_liftdownpos': m1_liftdownpos.value,'m1_liftuppos': m1_liftuppos.value,
            'm1_enteryside_level1': m1_enteryside_level1.value, 'm1_lift_level1': m1_lift_level1.value,'m1_lift_level2': m1_lift_level2.value,
            'm1_index_entery': m1_index_entery.value, 'm1_index_exit': m1_index_exit.value,'m1_auto': m1_auto.value, 'm1_manual': m1_manual.value, 
            'm1_start': m1_start.value,'m1_stop': m1_stop.value, 'm1_reset': m1_reset.value, 'm1_emergency_reset': m1_emergency_reset.value,
            'm1_emergency_stop': m1_emergency_stop.value, 'm1_emergency_stop1': m1_emergency_stop1.value, 'm1_emergency_stop2': m1_emergency_stop2.value, 
            'm1_emergency_stop3': m1_emergency_stop3.value, 'm1_emergency_stop4': m1_emergency_stop4.value, 
            # Module 2
            'm2_liftcontrol_on': m2_liftcontrol_on.value, 'm2_qscontrol_on': m2_qscontrol_on.value,
            'm2_lifthomepos': m2_lifthomepos.value, 'm2_liftdownpos': m2_liftdownpos.value,'m2_liftuppos': m2_liftuppos.value,
            'm2_lift_level1': m2_lift_level1.value,'m2_lift_level2': m2_lift_level2.value,
            'm2_index_entery': m2_index_entery.value, 'm2_index_exit': m2_index_exit.value,
            
            }
# ----------------------------------------------------------------------------------------------------------------------------


# -------------------Start--get- Diagnostics Digital Output--------------------------------------------------------------------
        

@router.get("/diagnostics_ditital_output")
def diag_digital_output():


    # Module 1
    towerlamp_red = plc.read('TowerLamp_Red')
    towerlamp_yellow = plc.read('TowerLamp_Yellow')
    towerlamp_green = plc.read('TowerLamp_Green')
    towerlamp_blue = plc.read('TowerLamp_Blue')
    towerlamp_buzzer = plc.read('TowerLamp_Buzzer')
    
    # Module 2
    machine_start = plc.read('Machine_Start_lamp')
    machine_stop = plc.read('Machine_Stop_lamp')
    machine_reset = plc.read('Machine_Reset_lamp')
    


    
    return {'towerlamp_red': towerlamp_red.value, 'towerlamp_yellow': towerlamp_yellow.value,'towerlamp_green': towerlamp_green.value,
            'towerlamp_blue': towerlamp_blue.value, 'towerlamp_buzzer': towerlamp_buzzer.value,
            # Module 2
            'machine_start': machine_start.value, 'machine_stop': machine_stop.value,
            'machine_reset': machine_reset.value, 
            
            }
# ----------------------------------------------------------------------------------------------------------------------------




# --------------------------Get Diagnostics Equipment Module PLC----------------------------------------------------------------------------

@router.get("/diagnosticEM")
def Diagnostic_EM():

    em_states = {}
    for i in range(1, 32):
        tag_name = f'EM{i:02}'
        em_states[tag_name] = plc.read(f'{tag_name}_States').value

    return em_states


# --------------------------Get Diagnostics PackML PLC----------------------------------------------------------------------------

@router.get("/diagnostics_packML")
def diag_PackML():
    packml_state = plc.read('PackMl_State').value

    return {'packml_state': packml_state}