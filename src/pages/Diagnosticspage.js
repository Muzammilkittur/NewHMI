import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconsRadio from './GroupRadio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Stack, Grid } from '@mui/material';
import DiagnosticsPLCIO from './DiagnosticsContent/DiagnosticsPLC_IO';
import DiagnosticsIndLift from './DiagnosticsContent/DiagnosticsInd_lift';
import DigitalInputs from './DiagnosticsContent/DiagnosticsDI';
import DigitalOutputs from './DiagnosticsContent/DiagnosticsDO';
import DiagnosticsPackML from './DiagnosticsContent/DiagnosticsPackML';
import DiagnosticQuickStick from './DiagnosticsContent/DiagnosticQuickStick';
import DiagnosticsBot from './DiagnosticsContent/DiagnosticsBot';
import Equipment_Module from './DiagnosticsContent/DiagnosticsEM';
import AlertDialog from '../component/DialogButton';





export default function RowRadioButtonsGroup() {

  // ----------------------Get Tags ---Diagnosticpage PLC---------------------------------------------------------------------------------------
  const [selectedBot, setselectedBot] = useState(1);
  const [selected_indLift, setselected_indLift] = useState(1);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDiagnosticPLCIO(selectedBot);
      fetchindLift(selected_indLift);
      fetchDiagnosticQuickStick();
      

    }, 500);

    return () => clearInterval(intervalId);
  }, [selectedBot, selected_indLift]);

  const handleRadioBotChange = (value) => {
    setselectedBot(value);
  };


  const handleIndLiftRadioChange = (value) => {
    setselected_indLift(value);
  };



  //------------------------Get---Diagnostic IO PLC-PLC IO------------------------------------------------------------------------------------------------
  
  // PLC IO
  const [EmergencyStop, setEmergencyStop]=useState('');
  const [Start, setStart ]=useState('');
  const [LiftHome, setLiftHome ]=useState('');
  const [OverTravel, setOverTravel ]=useState('');
  const [ForkArm1Home, setForkArm1Home ]=useState('');
  const [ForkArm2Home, setForkArm2Home ]=useState('');
  const [ForkArm1LH, setForkArm1LH ]=useState('');
  const [ForkArm2LH, setForkArm2LH ]=useState('');
  const [ForkArm1RH, setForkArm1RH ]=useState('');
  const [ForkArm2RH, setForkArm2RH ]=useState('');
  const [WidthAdjusterHome, setWidthAdjusterHome ]=useState('');
  const [WidthAdjusterEnd, setWidthAdjusterEnd ]=useState('');
  const [BinPresent, setBinPresent ]=useState('');

  

  
  const fetchDiagnosticPLCIO = async (number, axis) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/diagnostics_plcIO', {
        params: {
          number: number,
          axis: axis,

        },
        headers: {
          'Accept': 'application/json'
        }
      });
      

      // PLC IO
      setEmergencyStop(response.data.emergency_stop);
      setStart(response.data.start);
      setLiftHome(response.data.lift_home);
      setOverTravel(response.data.over_travel);
      setForkArm1Home(response.data.fork_arm1_home);
      setForkArm2Home(response.data.fork_arm2_home);
      setForkArm1LH(response.data.fork_arm1_LH);
      setForkArm2LH(response.data.fork_arm2_LH);
      setForkArm1RH(response.data.fork_arm1_RH);
      setForkArm2RH(response.data.fork_arm2_RH);
      setWidthAdjusterHome(response.data.width_adjust_home);
      setWidthAdjusterEnd(response.data.width_adjust_end);
      setBinPresent(response.data.bin_present);
      
     
      

      
      
      

    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };
  //----------------end of Get--Diagnostics IO PLC-PLC--------------------------------------------------



  

  //------------------------Get---Diagnostics-PLC------------------------------------------------------------------------------------------------
  

  


  // Indexer
  const [ind_enabled, setind_enabled] = useState('');
  const [IndPosition, setIndPosition] = useState('');
  const [IndVelocity, setIndVelocity] = useState('');
  const [IndPhyFault, setIndPhyFault] = useState('');
  const [IndGroupFault, setIndGroupFault] = useState('');
  const [IndServoAction, setIndServoAction] = useState('');
  const [IndServoStatus, setIndServoStatus] = useState('');
  const [IndDCBus, setIndDCBus] = useState('');
  const [IndLevel1Deg0, setIndLevel1Deg0] = useState('');
  const [IndLevel1Deg90, setIndLevel1Deg90] = useState('');
  const [IndLevel2Deg0, setIndLevel2Deg0] = useState('');
  const [IndLevel2Deg90, setIndLevel2Deg90] = useState('');
  // axis 1
  const [axis1_enabled, setaxis1_enabled] = useState('');
  const [Axis1Position, setAxis1Position] = useState('');
  const [Axis1Velocity, setAxis1Velocity] = useState('');
  const [Axis1PhyFault, setAxis1PhyFault] = useState('');
  const [Axis1GroupFault, setAxis1GroupFault] = useState('');
  const [Axis1ServoAction, setAxis1ServoAction] = useState('');
  const [Axis1ServoStatus, setAxis1ServoStatus] = useState('');
  const [Axis1DCBus, setAxis1DCBus] = useState('');
  const [Axis1Home, setAxis1Home] = useState('');
  // axis 2
  const [axis2_enabled, setaxis2_enabled] = useState('');
  const [Axis2Position, setAxis2Position] = useState('');
  const [Axis2Velocity, setAxis2Velocity] = useState('');
  const [Axis2PhyFault, setAxis2PhyFault] = useState('');
  const [Axis2GroupFault, setAxis2GroupFault] = useState('');
  const [Axis2ServoAction, setAxis2ServoAction] = useState('');
  const [Axis2ServoStatus, setAxis2ServoStatus] = useState('');
  const [Axis2DCBus, setAxis2DCBus] = useState('');
  const [Axis2Home, setAxis2Home] = useState('');

  
  const fetchindLift = async (number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/diagnostics_indlift/${number}`, {
        params: {
          number: number,
        },
        headers: {
          'Accept': 'application/json'
        }
      }); 
      


      

      // Indexer
      setind_enabled(response.data.ind_enabled);
      setIndPosition(response.data.indposition);
      setIndVelocity(response.data.indvelocity);
      setIndPhyFault(response.data.indphyfault);
      setIndGroupFault(response.data.ind_group_fault);
      setIndServoAction(response.data.ind_servo_action);
      setIndServoStatus(response.data.ind_servo_status);
      setIndDCBus(response.data.ind_DC_bus);
      setIndLevel1Deg0(response.data.ind_level1_deg0);
      setIndLevel1Deg90(response.data.ind_level1_deg90);
      setIndLevel2Deg0(response.data.ind_level2_deg0);
      setIndLevel2Deg90(response.data.ind_level2_deg90);
      // axis 1
      setaxis1_enabled(response.data.axis1_enabled);
      setAxis1Position(response.data.axis1_position);
      setAxis1Velocity(response.data.axis1_velocity);
      setAxis1PhyFault(response.data.axis1_phy_fault);
      setAxis1GroupFault(response.data.axis1_group_fault);
      setAxis1ServoAction(response.data.axis1_servo_action);
      setAxis1ServoStatus(response.data.axis1_servo_status);
      setAxis1DCBus(response.data.axis1_DC_bus);
      setAxis1Home(response.data.axis1_home);
      // axis 2
      setaxis2_enabled(response.data.axis2_enabled);
      setAxis2Position(response.data.axis2_position);
      setAxis2Velocity(response.data.axis2_velocity);
      setAxis2PhyFault(response.data.axis2_phy_fault);
      setAxis2GroupFault(response.data.axis2_group_fault);
      setAxis2ServoAction(response.data.axis2_servo_action);
      setAxis2ServoStatus(response.data.axis2_servo_status);
      setAxis2DCBus(response.data.axis2_DC_bus);
      setAxis2Home(response.data.axis2_home);
      
      

    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };
  //----------------end of Get--Diagnostics-PLC--------------------------------------------------



  //------------------------Get---Diagnostic Quick Stick PLC------------------------------------------------------------------------------------------------
  
  // Quick Stick
  const [Initializing, setInitializing]=useState('');
  const [disconnected, setdisconnected]=useState('');
  const [connected, setconnected]=useState('');
  const [idle, setidle]=useState('');
  const [faulted, setfaulted]=useState('');
  const [hlcOperational, sethlcOperational]=useState('');
  const [ncOperational, setncOperational]=useState('');
  const [connecting, setconnecting]=useState('');
  const [disconnecting, setdisconnecting]=useState('');
  const [configuring, setconfiguring]=useState('');
  const [alarm, setalarm]=useState('');
  const [ready, setready]=useState('');
  const [errorCode, seterrorCode]=useState('');
  

  
  const fetchDiagnosticQuickStick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/diagnostics_QuickStick', {
       
        headers: {
          'Accept': 'application/json'
        }
      });
      

      // PLC IO
      setInitializing(response.data.initializing);
      setdisconnected(response.data.disconnected);
      setconnected(response.data.connected);
      setidle(response.data.idle);
      setfaulted(response.data.faulted);
      sethlcOperational(response.data.hlcOperational);
      setncOperational(response.data.ncOperational);
      setconnecting(response.data.connecting);
      setdisconnecting(response.data.disconnecting);
      setconfiguring(response.data.configuring);
      setalarm(response.data.alarm);
      setready(response.data.ready);
      seterrorCode(response.data.errorCode);

     
      
     
      

      
      
      

    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };
  //----------------end of Get--Diagnostics IO PLC-PLC--------------------------------------------------
















  return (
    <Grid container justifyContent="center"> 
      {/* First Grid */}
      <Grid item xs={4}> 
        <FormControl>
          <RadioGroup>
            <Stack spacing={2.5} padding={1}>
              <FormControlLabel value="Bot 1" control={<IconsRadio name={'Bot'} ids={[1,2,3,4]} selectedBot={selectedBot} onChange={handleRadioBotChange} />} />
            </Stack>
          </RadioGroup>
          {/* <div>Selected Bot {selectedBot}</div> */}
          {/* <h4>botfault-{BotFault? 'true' : 'false'}</h4>  */}
          

          <Stack padding={1.5}>
            <DiagnosticsPLCIO selectedBot={selectedBot}
            EmergencyStop={EmergencyStop} Start={Start} LiftHome={LiftHome} OverTravel={OverTravel} ForkArm1Home={ForkArm1Home}
            ForkArm2Home={ForkArm2Home} ForkArm1LH={ForkArm1LH} ForkArm2LH={ForkArm2LH} ForkArm1RH={ForkArm1RH} ForkArm2RH={ForkArm2RH}
            WidthAdjusterHome={WidthAdjusterHome} WidthAdjusterEnd={WidthAdjusterEnd} BinPresent={BinPresent}
            />

             <DiagnosticsBot selectedBot={selectedBot} />
          </Stack>

          

    
          
          

        
        </FormControl>
      </Grid>

      <Grid item xs={4}> 
        <FormControl>
         

           <Stack padding={1.5}>
            <DiagnosticQuickStick Initializing={Initializing} disconnected={disconnected} connected={connected} idle={idle} faulted={faulted}
            hlcOperational={hlcOperational} ncOperational={ncOperational} connecting={connecting} disconnecting={disconnecting} configuring={configuring}
            alarm={alarm} ready={ready} errorCode={errorCode}
            />

           
          </Stack>

          <Stack padding={1} spacing={1} direction='row'>
          <AlertDialog buttonName="Digital Inputs" Title='Digital Inputs' contentComponent={DigitalInputs} />

          <AlertDialog buttonName="Digital Outputs" Title='Digital Outputs' contentComponent={DigitalOutputs} />
   
          </Stack>

          <Stack padding={1} spacing={1} direction='row'>
          <AlertDialog buttonName="Equipment Module" Title='Equipment Module' contentComponent={Equipment_Module} />

          <AlertDialog buttonName="PackML" Title='PackML' contentComponent={DiagnosticsPackML} />
   
          </Stack>
  
          

        
        </FormControl>
      </Grid>
      
      {/* Second Grid */}
      <Grid item xs={4}>
        <Grid container paddingTop={1} justifyContent="center">
          {/* <div>Selected Ind-Lift: {selected_indLift}</div> */}
          {/* <h4>fault-{IndPhyFault? 'true' : 'false'}</h4> */}
         
          <Stack spacing={1} padding={1} paddingTop={0}> 
            <FormControlLabel value="IndLift" control={<IconsRadio name={'Ind-Lift'} ids={[1, 2]} selectedBot={selected_indLift} onChange={handleIndLiftRadioChange} />} />
          </Stack>
          
          <Stack padding={1.5}>
            <DiagnosticsIndLift ind_enabled={ind_enabled} selected_indLift={selected_indLift} IndPosition={IndPosition} IndVelocity={IndVelocity} IndPhyFault={IndPhyFault}
            IndGroupFault={IndGroupFault} IndServoAction={IndServoAction} IndServoStatus={IndServoStatus}
            IndDCBus={IndDCBus} IndLevel1Deg0={IndLevel1Deg0} IndLevel1Deg90={IndLevel1Deg90} IndLevel2Deg0={IndLevel2Deg0} IndLevel2Deg90={IndLevel2Deg90}
            // axis 1
            axis1_enabled={axis1_enabled}
            Axis1Position={Axis1Position} Axis1Velocity={Axis1Velocity} Axis1PhyFault={Axis1PhyFault}
            Axis1GroupFault={Axis1GroupFault} Axis1ServoAction={Axis1ServoAction} Axis1ServoStatus={Axis1ServoStatus}
            Axis1DCBus={Axis1DCBus} Axis1Home={Axis1Home}
            // axis 2
            axis2_enabled={axis2_enabled}
            Axis2Position={Axis2Position} Axis2Velocity={Axis2Velocity} Axis2PhyFault={Axis2PhyFault}
            Axis2GroupFault={Axis2GroupFault} Axis2ServoAction={Axis2ServoAction} Axis2ServoStatus={Axis2ServoStatus}
            Axis2DCBus={Axis2DCBus} Axis2Home={Axis2Home}
            />
          </Stack>

        
        </Grid>
      </Grid>
    </Grid>
  );
}
