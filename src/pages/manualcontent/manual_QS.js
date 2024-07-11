import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Stack, Grid, Box, Button, TextField, InputAdornment } from '@mui/material';
import axios from 'axios';


export default function ManualQS() {
  const buttonStyle = { textTransform: 'none', fontSize: 'small' };
  const buttondisable = { textTransform: 'none', pointerEvents: 'none' , fontSize: 'small' };


  

    // ----------------PLC Get Manual Quick Stick-------------------------------------------------------------------------
    const intervalRef = useRef(null);
  const [QSData, setQSData] = useState({});

  const fetchManualQS = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/manual_quickStick', {
        headers: {
          'Accept': 'application/json'
        }
      });
      setQSData(response.data);
    } catch (error) {
      console.error('Error fetching the bot data', error);
    }
  }, []);

  useEffect(() => {
    fetchManualQS();

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      fetchManualQS();
    }, 500); 

    return () => clearInterval(intervalRef.current); // cleanup on component unmount
  }, [fetchManualQS]);
  // --------------------------------------------------------------------------------------------------------------------------



//----------------------Buttons PLC Momentary----------------------------------------------------------------------

  

const handleButtonPress = async (tag) => {
    try {
      const response = await fetch(`http://localhost:8000/manualQS_plc/${tag}/press`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log(`Button pressed for tag ${tag}. Command sent to PLC.`);
      } else {
        console.error('Failed to send command to PLC.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const handleButtonRelease = async (tag) => {
    try {
      const response = await fetch(`http://localhost:8000/manualQS_plc/${tag}/release`, {
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



  // ----------========Textfield Enter Data===========
  
  const [StartPath, setStartPath] = useState('');
  const [MoveMovPID, setMoveMovPID] = useState('');
  const [TargPID, setTargPID] = useState('');
  const [Pos, setPos] = useState('');
  const [Vel, setVel] = useState('');
  const [Accel, setAccel] = useState('');
  const [pid, setpid] = useState('');
  const [LinNod, setLinNod] = useState('');
  const [ContPath, setContPath] = useState('');
  const [PeePath, setPeePath] = useState('');
  const [LinkMovID, setLinkMovID] = useState('');
  const [MovIDBot1, setMovIDBot1] = useState('');
  const [MovIDBot2, setMovIDBot2] = useState('');
  const [MovIDBot3, setMovIDBot3] = useState('');
  const [MovIDBot4, setMovIDBot4] = useState('');
  
  
  
  
  async function postManualQSToApi(StartPath, MoveMovPID, TargPID, Pos, Vel, Accel, pid, LinNod, ContPath, PeePath, LinkMovID, MovIDBot1, MovIDBot2, MovIDBot3, MovIDBot4 ) {
    const apiUrl = 'http://127.0.0.1:8000/post_update_manualQS';
    const data = {
      startup_path: StartPath,
      move_moverPID: MoveMovPID,
      target_PID: TargPID,
      pos: Pos,
      vel: Vel,
      accel: Accel,
      Pid: pid,
      lin_nod: LinNod,
      cont_path: ContPath,
      pee_path: PeePath,
      lin_movID: LinkMovID,
      movID_bot1: MovIDBot1,
      movID_bot2: MovIDBot2,
      movID_bot3: MovIDBot3,
      movID_bot4: MovIDBot4,
    };
    
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          console.log('Data posted successfully!');
          // You may want to perform additional actions upon successful submission
        } else {
          console.error('Failed to post data to the API.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }
    // -----===============



    const handleFormSubmit = () => {
      postManualQSToApi(StartPath, MoveMovPID, TargPID, Pos, Vel, Accel, pid, LinNod, ContPath, PeePath, LinkMovID, MovIDBot1, MovIDBot2, MovIDBot3, MovIDBot4);
    };














    const buttonData = [
      { label: 'Startup', action: 'Startup', releaseAction: true },
      { label: 'Stop', action: 'Stop', releaseAction: true },
      { label: 'Resume', action: 'Resume', releaseAction: true },
      { label: 'Suspend', action: 'Suspend', releaseAction: true },
      { label: 'Path reset', action: 'PathReset', releaseAction: true },
      { label: 'Reset Target Path', action: 'ResetTargetPath', releaseAction: true },
      { label: 'cmd Link', action: 'CmdLink', releaseAction: true },
      { label: 'cmd UnLink', action: 'CmdUnlink', releaseAction: true },
    ];
    
    const renderButtons = () => {
      return buttonData.map(({ label, action, releaseAction }) => (
        <Button key={action} size="small" variant="contained" color="inherit" sx={buttonStyle}
            onMouseDown={() => handleButtonPress(action)}
            {...(releaseAction && {
            onMouseUp: () => handleButtonRelease(action),
          })}
          style={{ backgroundColor: QSData.MoveButton && action === 'Move' ? 'green' : '' }}
        >
          {label}
        </Button>
      ));
    };

    











  

  return (
    <Grid container className='App' justifyContent="center" alignItems="center">

      {/*----------------------------------------Buttons---------------------------------------------------------- */}


      <Grid item xs={12}>
         

        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <Button size="small" variant="contained" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('Move')}
            onDoubleClick={() => handleButtonRelease('Move')}
            style={{ backgroundColor: QSData.MoveButton ? 'green' : '' }}>Move</Button>
          {renderButtons()}
        </Stack>
      </Grid>    
  
   {/* -------------------------------------------Box-1 ------------------------------------------------------ */}
      <Grid item >
      <Box className="column" style={{ textAlign: "center", backgroundColor: '#e6fff2'}}>
        
        <Stack direction="row" paddingTop={2} spacing={0.5}>
          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setStartPath(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.startuppathid} id="outlined-basic"  label="Startup Path ID" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>

          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setpid(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.pid} id="outlined-basic"  label="PID" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
        </Stack>

        <Stack direction="row" paddingTop={2} spacing={0.5}>
          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setMoveMovPID(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.movemoverpid} id="outlined-basic"  label="Move Mover path ID" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>

          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setLinNod(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.linknode} id="outlined-basic"  label="Link/Unlink Node" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
        </Stack>

        <Stack direction="row" paddingTop={2} spacing={0.5}>
          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setTargPID(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.targetpid} id="outlined-basic"  label="Target path ID" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>

          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setContPath(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.controlpath} id="outlined-basic"  label="Control Path" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
        </Stack>


        <Stack direction="row" paddingTop={2} spacing={0.5}>
          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setPos(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.position} id="outlined-basic"  label="Position" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>

          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setPeePath(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.peerpath} id="outlined-basic"  label="Peer Path" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
        </Stack>
        

        <Stack direction="row" paddingTop={2} spacing={0.5}>
          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setVel(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.velocity} id="outlined-basic"  label="Velocity" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>

          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setLinkMovID(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.linkmoverid} id="outlined-basic"  label="Link Mover ID" style={{ width: 105 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
        </Stack>

      

  

        <Stack direction="row" paddingTop={1.5} spacing={0.5}>
          <TextField variant="outlined" size="small"  style={{ width:  60}} onChange={(e) => setAccel(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField value={QSData.acceleration} variant="outlined" label="Acceleration" size="small"  style={{ width: 124 }}
          InputProps={{sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">mm/s²</InputAdornment>}}
          InputLabelProps={{shrink: true}}/>


          <TextField value={QSData.upstream_link} label="Upstream link status" size="small" style={{ width: 150 }}
          InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'}}} InputLabelProps={{shrink: true}}/>
      
        </Stack>

        <Stack direction="row" paddingTop={1.5} spacing={0.5}>
          <TextField value={QSData.path_state} label="Path State" size="small" style={{ width: 150 }}
          InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}} InputLabelProps={{shrink: true}}/>

          <TextField value={QSData.downstream_link} label="Downstream link status" size="small" style={{ width: 150 }}
          InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}} InputLabelProps={{shrink: true}}/>
        </Stack>

        <Stack direction="row" paddingTop={1.5} spacing={0.5}>
          <TextField value={QSData.path_movement} label="Path Movement Status" size="small" style={{ width: 150 }}
          InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}} InputLabelProps={{shrink: true}}/>
        </Stack>

        
      </Box>
      </Grid>



   
{/* -------------------------------------------Bot 2------------------------------------------------------ */}



      <Grid item >
        <Box className="column" style={{backgroundColor: '#e6fff2'}}>

        <p>
      Mover ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Path ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Position&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bot Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mover ID
    </p>

        <Stack direction='row' spacing={1.5} paddingBottom={1}>
        <Button size="small" color="inherit" sx={ buttondisable }>1</Button>
            <TextField value={QSData.Path_ID1} size="small" style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
            <TextField value={QSData.Path_position1} size="small"  style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
            <Button size="small" color="inherit" sx={ buttondisable }>1</Button>

           <TextField variant="outlined" size="small"  style={{ width:  40}} onChange={(e) => setMovIDBot1(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.moveridbot1} id="outlined-basic" style={{ width: 70 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>

        </Stack>
        <Stack direction='row' spacing={1.5} paddingBottom={1}>
        <Button size="small" color="inherit" sx={ buttondisable }>2</Button>
            <TextField value={QSData.Path_ID2} size="small" style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
            <TextField value={QSData.Path_position3} size="small"  style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
            <Button size="small" color="inherit" sx={ buttondisable }>2</Button>
            
            <TextField variant="outlined" size="small"  style={{ width:  40}} onChange={(e) => setMovIDBot2(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.moveridbot2} id="outlined-basic" style={{ width: 70 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
          </Stack>

        <Stack direction='row' spacing={1.5} paddingBottom={1}>
            <Button size="small" color="inherit" sx={ buttondisable }>3</Button>
            <TextField value={QSData.Path_ID3} size="small" style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
            <TextField value={QSData.Path_position3} size="small"  style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
            <Button size="small" color="inherit" sx={ buttondisable }>3</Button>
           
            <TextField variant="outlined" size="small"  style={{ width:  40}} onChange={(e) => setMovIDBot3(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.moveridbot3} id="outlined-basic" style={{ width: 70 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
        

        </Stack>
        <Stack direction='row' spacing={1.5} paddingBottom={1}>
        <Button size="small" color="inherit" sx={ buttondisable }>4</Button>
            <TextField value={QSData.Path_ID4} size="small" style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
            <TextField value={QSData.Path_position1} size="small"  style={{ width: 70 }}
                    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}/> 
           <Button size="small" color="inherit" sx={ buttondisable }>4</Button>

           <TextField variant="outlined" size="small"  style={{ width:  40}}  onChange={(e) => setMovIDBot4(e.target.value)}
            InputProps={{sx: { backgroundColor: '#ffff', height: '30px' }}}/>

          <TextField size='small' value={QSData.moveridbot4} id="outlined-basic" style={{ width: 70 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} InputLabelProps={{shrink: true}}/>
        </Stack>
       
       </Box>

      </Grid>
      <Button variant="contained" onClick=   {handleFormSubmit}>
                  Submit
                </Button>
    </Grid>
  );
}
