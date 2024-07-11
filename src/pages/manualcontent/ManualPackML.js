import React, { useState, useEffect } from 'react';
import { Stack, Card, Button, Fab, Tooltip } from '@mui/material';
import CardContent from "@mui/material/CardContent";
import MediaCard from "../../component/Card";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DangerousIcon from '@mui/icons-material/Dangerous';
import axios from "axios";


const Line = ({ orientation = 'horizontal', width = '5%', height = '1px', color = 'white' }) => (
  <div
    style={{
      width: orientation === 'horizontal' ? width : height,
      height: orientation === 'horizontal' ? height : width,
      backgroundColor: color,
      position: 'relative',
      top: '35px' // Adjust this value to move the line down
				 
    }}
  />
);


const statusMap = {
  1: { label: 'Idle', color: '#DCDEDA' },
  2: { label: 'Moving to Retrieve', color: '#1FFC04' },
  3: { label: 'Retrieving Bin', color: '#DA36FB' },
  4: { label: 'Moving to Storing', color: '#1FFC04' },
  5: { label: 'Storing Bin', color: '#DA36FB' },
  6: { label: 'Obstacle Clearing', color: '#F9F442'}
  
};


export default function NestedMediaCard() {
  const buttonStyle = { textTransform: 'none', fontSize: 'small' };

  
  // ----------------PLC Get Manual PackML-------------------------------------------------------------------------
  const [EquipmentFault, setEquipmentFault]= useState(null);
  const [sState, setsState] = useState("None");
  const [StatusIlde, setStatusIlde]= useState(null);
  const [StatusExecute, setStatusExecute]= useState(null);
  const [StatusAborting, setStatusAborting]= useState(null);
  const [StatusAborted, setStatusAborted]= useState(null);
  const [StatusCleaning, setStatusCleaning]= useState(null);
  const [StatusStopped, setStatusStopped]= useState(null);
  const [StatusResetting, setStatusResetting]= useState(null);
  const [B1TaskStatus, setB1TaskStatus] = useState(null);
  const [B2TaskStatus, setB2TaskStatus] = useState(null);
  const [Lift1Pos, setLift1Pos] = useState("None");
  const [Lift2Pos, setLift2Pos] = useState("None");
  const [Mover1Seq, setMover1Seq] = useState("None");
  const [Mover2Seq, setMover2Seq] = useState("None");
  // Button Status
  const [DummyMover1Button, setDummyMover1Button] = useState('');
  const [DummyMover2Button, setDummyMover2Button] = useState('');
  const [MachineResetOnButton, setMachineResetOnButton] = useState('');
  const [Retrieve1Button, setRetrieve1Button] = useState('');
  const [Retrieve2Button, setRetrieve2Button] = useState('');
  const [Store1Button, setStore1Button] = useState('');
  const [Store2Button, setStore2Button] = useState('');
  const [QSResetButton, setQSResetButton] = useState('');
  const [AutoButton, setAutoButton] = useState('');
  const [ManualButton, setManualButton] = useState('');
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPackML();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const fetchPackML = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/manual_packML', {
        headers: {
          'Accept': 'application/json'
        }
      });

      setEquipmentFault(response.data.equipmentfault);
      setsState(response.data.sState);
      setStatusIlde(response.data.statusidle);
      setStatusExecute(response.data.statusexecute);
      setStatusAborting(response.data.statusaborting);
      setStatusAborted(response.data.statusaborted);
      setStatusCleaning(response.data.statuscleaning);
      setStatusStopped(response.data.statusstopped);
      setStatusResetting(response.data.statusresetting);
      setB1TaskStatus(response.data.B1taskstatus);
      setB2TaskStatus(response.data.B2taskstatus);
      setLift1Pos(response.data.lift1pos);
      setLift2Pos(response.data.lift2pos);
      setMover1Seq(response.data.mover1seq);
      setMover2Seq(response.data.mover2seq);
      // Button Status
      setDummyMover1Button(response.data.dummymover1);
      setDummyMover2Button(response.data.dummymover2);
      setMachineResetOnButton(response.data.machinereseton);
      setRetrieve1Button(response.data.bot1retrieve);
      setRetrieve2Button(response.data.bot2retrieve);
      setStore1Button(response.data.bot1store);
      setStore2Button(response.data.bot2store);
      setQSResetButton(response.data.qsreset);
      setAutoButton(response.data.auto);
      setManualButton(response.data.manual);
  
      

    } catch (error) {
      console.error('Error fetching tag Get values:', error);
    }
  };
// --------------------------------------------------------------------------------------------------------------------------











//----------------------Buttons PLC Momentary----------------------------------------------------------------------

  

const handleButtonPress = async (tag) => {
    try {
      const response = await fetch(`http://localhost:8000/manualPackML_plc/${tag}/press`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log(`Button pressed for tag ${tag}. Command sent to PLC.`);
        if (tag === 'Auto') {
          await handleButtonPress0('Manual');
        } else if (tag === 'Manual') {
          await handleButtonPress0('Auto');
        }
      } else {
        console.error('Failed to send command to PLC.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleButtonPress0 = async (tag) => {
    try {
      const response = await fetch(`http://localhost:8000/manualPackML_plc/${tag}/press0`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log(`Button pressed 0 for tag ${tag}. Command sent to PLC.`);
        if (tag === 'Auto') {
          setAutoButton(true);
          setManualButton(false);
        } else if (tag === 'Manual') {
          setAutoButton(false);
          setManualButton(true);
        }
      } else {
        console.error('Failed to send command to PLC.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  




  const handleButtonRelease = async (tag) => {
    try {
      const response = await fetch(`http://localhost:8000/manualPackML_plc/${tag}/release`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log(`Button released for tag ${tag}. Tag value set to zero.`);
      } else {
        console.error('Failed to reset tag value.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
// -----------------------end-Buttons PLC Momentary-----------------------------------------------------------------------------





  return (
    <Card sx={{ boxShadow: 10, backgroundColor: "teal" }}>
      <CardContent>
        <Stack direction='row' spacing={0.5} padding={1}>
            <MediaCard discription="Equipment Fault" isRed={EquipmentFault}/>
            <MediaCard title='Status' discription={sState} />
            <MediaCard title="B1" discription={statusMap[B1TaskStatus]?.label || "None"} customColor={statusMap[B1TaskStatus]?.color} />
            <MediaCard title="B2" discription={statusMap[B2TaskStatus]?.label || "None"} customColor={statusMap[B2TaskStatus]?.color} />
            <MediaCard title="Lift 1 Pos" discription={Lift1Pos} />
            <MediaCard title="Lift 2 Pos" discription={Lift2Pos} />
            <MediaCard title="Mover 1" discription={Mover1Seq}/>
            <MediaCard title="Mover 2" discription={Mover2Seq}/>
            
        
        </Stack>

       
        <Stack direction='row' spacing={0.5} padding={1}>
            <MediaCard discription="Idle" isGreen={StatusIlde}/>
            <Line />
            <MediaCard discription="Execute" isGreen={StatusExecute}/>
            <Line />
            <MediaCard discription="Aborting" isYellow={StatusAborting} />
            <Line />
            <MediaCard discription="Aborted" isRed={StatusAborted}/>
        </Stack>
  
        <Stack direction='row' spacing={0.5} padding={1}>
            <MediaCard discription="Stopped" isRed={StatusStopped}/>
            <Line />
            <MediaCard discription="Clearing" isYellow={StatusCleaning}/>
            <Line />
            <MediaCard discription="Resetting" isGreen={StatusResetting}/>
            <Line orientation="vertical" height="100px" width="1px" />
        
  
        </Stack>
        
																		  
																			
        
       

        <Stack direction='row' spacing={5.5} padding={1}>

            <Button variant="contained" color="primary" sx={buttonStyle}
             onMouseDown={() => handleButtonPress('DummyMover1')}
             onDoubleClick={() => handleButtonPress0('DummyMover1')}
             style={{ backgroundColor: DummyMover1Button ? '#1FFC04' : '' }}>Mover 1 Action Activated</Button>

            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('DummyMover2')}
            onDoubleClick={() => handleButtonPress0('DummyMover2')}
            style={{ backgroundColor: DummyMover2Button ? '#1FFC04' : '' }}>Mover 2 Action Activated</Button>



            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('MachineResetOn')}
            onDoubleClick={() => handleButtonPress0('MachineResetOn')}
            style={{ backgroundColor: MachineResetOnButton ? '#1FFC04' : '' }}>Machine Reset ON</Button>

            
        </Stack>

         <Stack direction='row' spacing={0.5} padding={1}>
            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('RetrievalDone1')}
            onDoubleClick={() => handleButtonPress0('RetrievalDone1')}
            style={{ backgroundColor: Retrieve1Button ? '#1FFC04' : '' }}>Bot-1 Retrieve Done</Button>
        

            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('StorageDone1')}
            onDoubleClick={() => handleButtonPress0('StorageDone1')}
            style={{ backgroundColor: Store1Button ? '#1FFC04' : '' }}>Bot-1 Store Done</Button>

            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('RetrievalDone2')}
            onDoubleClick={() => handleButtonPress0('RetrievalDone2')}
            style={{ backgroundColor: Retrieve2Button ? '#1FFC04' : '' }}>Bot-2 Retrieve Done</Button>
        

            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('StorageDone2')}
            onDoubleClick={() => handleButtonPress0('StorageDone2')}
            style={{ backgroundColor: Store2Button ? '#1FFC04' : '' }}>Bot-2 Store Done</Button>
        </Stack>

        <Stack direction='row' spacing={3} padding={1}>
      
            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('QSReset')}
            onDoubleClick={() => handleButtonPress0('QSReset')}
            style={{ backgroundColor: QSResetButton ? '#1FFC04' : '' }}>QS Reset</Button>


            <Button variant="contained" color="primary" sx={buttonStyle}
             onMouseDown={() => handleButtonPress('Auto')}
             onDoubleClick={() => handleButtonPress0('Auto')}
             style={{ backgroundColor: AutoButton ? '#1FFC04' : '' }}>Auto</Button>

            <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('Manual')}
            onDoubleClick={() => handleButtonPress0('Manual')}
            style={{ backgroundColor: ManualButton ? '#1FFC04' : '' }}>Manual</Button>

            <Tooltip title="Start"><Fab variant="contained" color="success"
            onMouseDown={() => handleButtonPress('Start')}
            onMouseUp={() => handleButtonRelease('Start')}><PlayCircleFilledWhiteIcon/></Fab></Tooltip>

            <Tooltip title="Stop"><Fab variant="contained" color="error"
            onMouseDown={() => handleButtonPress('Stop')}
            onMouseUp={() => handleButtonRelease('Stop')}><StopCircleIcon/></Fab></Tooltip>

            <Tooltip title="Reset"><Fab variant="contained" color="primary"
            onMouseDown={() => handleButtonPress('Reset')}
            onMouseUp={() => handleButtonRelease('Reset')}><RestartAltIcon/></Fab></Tooltip>

            <Tooltip title="Emergency Stop"><Fab variant="contained" color="error"
            onMouseDown={() => handleButtonPress('EmergencyStop')}
            onMouseUp={() => handleButtonRelease('EmergencyStop')}><DangerousIcon /></Fab></Tooltip>
          

          
        
        </Stack>

      </CardContent>
    </Card>
  );
}
