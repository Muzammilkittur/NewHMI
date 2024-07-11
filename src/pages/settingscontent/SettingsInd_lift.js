import React, { useState } from 'react';
import {Stack, Button,Grid} from '@mui/material';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import {TextField, Fab, InputAdornment, Tooltip} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';




export default function SettingsindLift({ indLift, selectedIndLift
  }) {

  
  

  const [isEnabledind, setIsEnabledind] = useState(false);
  const [isEnabledlift, setIsEnabledlift] = useState(false);
  


 //----------------------Buttons PLC Momentary----------------------------------------------------------------------

  

 const handleButtonPress = async (set_tag) => {
     try {
       const response = await fetch(`http://localhost:8000/settingsindLiftButton_plc/${set_tag}/press/${selectedIndLift}`, {
         method: 'POST',
       });
       if (response.ok) {
         console.log(`Button pressed for tag ${set_tag}. Command sent to PLC.`);
       } else {
         console.error('Failed to send command to PLC.');
       }
     } catch (error) {
       console.error('Error:', error);
     }
   };
 
   const handleButtonRelease = async (set_tag) => {
     try {
       const response = await fetch(`http://localhost:8000/settingsindLiftButton_plc/${set_tag}/release/${selectedIndLift}`, {
         method: 'POST',
       });
       if (response.ok) {
         console.log(`Button released for tag ${set_tag}. Tag value set to zero.`);
       } else {
         console.error('Failed to reset tag value.');
       }
     } catch (error) {
       alert(`Error sending ${set_tag} command: ${error.message}`);
     }
   };
 // -----------------------end-Buttons PLC Momentary-----------------------------------------------------------------------------
 
 












































  
  // ----------========Textfield Enter Data===========

const [indVelocity, setindVelocity] = useState('');
const [indAcceleration, setindAcceleration] = useState('');
const [indDeceleration, setindDeceleration] = useState('');
const [liftVelocity, setliftVelocity] = useState('');
const [liftAcceleration, setliftAcceleration] = useState('');
const [liftDeceleration, setliftDeceleration] = useState('');





async function postSettingsToApi( 
  indVelocity, indAcceleration, indDeceleration, liftVelocity, liftAcceleration, liftDeceleration) {
  const apiUrl = `http://127.0.0.1:8000/post_settings_indLift/${selectedIndLift}`;
  const data = {
      
      ind_velocity: indVelocity,
      ind_acceleration: indAcceleration,
      ind_deceleration: indDeceleration,
      lift_velocity: liftVelocity,
      lift_acceleration: liftAcceleration,
      lift_deceleration: liftDeceleration,
  
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
    postSettingsToApi(
      indVelocity, indAcceleration, indDeceleration, liftVelocity, liftAcceleration, liftDeceleration);
  };


  











  



















  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} lg={5} sx={{ minHeight: 330}} padding={1}> 
        <Box className="column" style={{ textAlign: "center", backgroundColor: indLift.Indexer_enable ? '#e6fff2' : '#fff5eb' }}>
        <h4>Indexer {selectedIndLift}</h4> 

  


        

          <Stack direction="row" padding={0.7} spacing={0.5}>
            
            <Button variant="contained" color={isEnabledind ? "success" : "inherit"}
            onMouseDown={() => {setIsEnabledind(true); handleButtonPress('Indexer_Settings.Enable');}}
            onMouseUp={() => handleButtonRelease('Indexer_Settings.Enable')}>Enable</Button>


            <Button variant="contained" color={isEnabledind ? "inherit" : "warning"}
            onMouseDown={() => {setIsEnabledind(false); handleButtonPress('Indexer_Settings.Disable');}}
            onMouseUp={() => handleButtonRelease('Indexer_Settings.Disable')}>Disable</Button>

    
            {indLift.Indexer_fault ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />}
            
        </Stack>

          <Stack direction="row" padding={0.5} spacing={0.5}>

              <TextField value={indLift.Indexer_Actual_Position} size='small' id="outlined-basic" label="Actual Position" style={{ width: 127 }} 
                InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">deg</InputAdornment>}} 
                InputLabelProps={{shrink: true}}/>
          </Stack>

          <Stack direction="row" padding={0.5} spacing={0.5}>
              <TextField value={indLift.Indexer_Actual_Velocity} size='small' id="outlined-basic" label="Actual Velocity" style={{ width: 127 }} 
                InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">deg/s</InputAdornment>}} 
                InputLabelProps={{shrink: true}}/>

          </Stack>

          <Stack direction="row" paddingTop={1.5} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setindVelocity(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={indLift.Indexer_Settings.Move_speed} size='small' id="outlined-basic" label="Velocity" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">deg/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>


          <Stack direction="row" paddingTop={1.5} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setindAcceleration(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/> 

            <TextField value={indLift.Indexer_Settings.Move_acc} size='small' id="outlined-basic" label="Acceleration" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>

          <Stack direction="row" padding={1.5} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setindDeceleration(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/> 

            <TextField value={indLift.Indexer_Settings.Move_dec} size='small' id="outlined-basic" label="Deceleration" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Indexer_servo_action_status ? '#1FFC04' : '#FA1203', p: 0.5, width: '130px' }}>Servo Action</Box>
                  <Box sx={{ bgcolor: indLift.Indexer_DC_bus_up_status ? '#1FFC04' : '#FA1203', p: 0.5, width: '130px' }}>DC Bus Up</Box>
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Indexer_Physical_axis_fault ? '#FA1203' : '#1FFC04', p: 0.5, width: '130px' }}>Physical Axis Fault</Box>
                  <Box sx={{ bgcolor: indLift.Indexer_Group_fault ? '#FA1203' : '#1FFC04', p: 0.5, width: '130px' }}>Group Fault</Box>

          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Indexer_at_level_1_deg_0 ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>Level 1, 0°</Box>
                  <Box sx={{ bgcolor: indLift.Indexer_at_level_1_deg_90 ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>Level 1, 90°</Box>
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Indexer_at_level_2_deg_0 ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>Level 2, 0°</Box>
                  <Box sx={{ bgcolor: indLift.Indexer_at_level_2_deg_90 ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>Level 2, 90°</Box>
          </Stack>
          


          <Stack direction="row" padding={0.5} spacing={1.5} paddingBottom={2}>
  


            <Tooltip title="Home"><Fab size="small" variant="contained"
          onMouseDown={() => handleButtonPress('Indexer_Settings.Home')}
          onMouseUp={() => handleButtonRelease('Indexer_Settings.Home')}>
          <OtherHousesIcon/>
            </Fab></Tooltip>



            <Tooltip title="Reset"><Fab size="small" variant="contained" color="error"
          onMouseDown={() => handleButtonPress('Indexer_Settings.Reset')}
          onMouseUp={() => handleButtonRelease('Indexer_Settings.Reset')}>
          <RestartAltIcon/>
            </Fab></Tooltip>

              <Button variant="contained"  onClick={handleFormSubmit}>
                      Submit
                    </Button>
          </Stack>


        </Box>
        </Grid>



        <Grid item xs={12} sm={6} lg={5} sx={{ minHeight: 330}} padding={1}> 
        <Box className="column" style={{ textAlign: "center", backgroundColor: indLift.Lift_axis_1_enable && indLift.Lift_axis_2_enable ? '#e6fff2' : '#fff5eb' }}>
        <h4>Lift {selectedIndLift}</h4>
          <Stack direction="row" padding={0.5} spacing={0.5}>

            <Button variant="contained" color={isEnabledlift ? "success" : "inherit"}
            onMouseDown={() => {setIsEnabledlift(true); handleButtonPress('Lift_Settings.Enable');}}
            onMouseUp={() => handleButtonRelease('Lift_Settings.Enable')}>Enable</Button>


            <Button variant="contained" color={isEnabledlift ? "inherit" : "warning"}
            onMouseDown={() => {setIsEnabledlift(false); handleButtonPress('Lift_Settings.Disable');}}
            onMouseUp={() => handleButtonRelease('Lift_Settings.Disable')}>Disable</Button>


            {indLift.Lift_axis_1_fault ? <CheckCircleIcon style={{ color: 'Green' }} /> : <ErrorIcon style={{ color: 'red' }} />}1
            {indLift.Lift_axis_2_fault ? <CheckCircleIcon style={{ color: 'green' }} /> : <ErrorIcon style={{ color: 'red' }} />}2
          </Stack>





          <Stack direction="row" padding={0.5} spacing={0.5} justifyContent="center" alignItems="center">

          <TextField value={indLift.Lift_axis_1_Actual_Position} size='small' id="outlined-disabled" label="Axis-1 Position" style={{ width: 127 }}
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px' }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
            InputLabelProps={{shrink: true}}/>

            <TextField type="number" value={indLift.Lift_axis_1_Actual_Velocity} size='small' id="outlined-basic" label="Axis-1 Velocity" style={{ width: 127 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
            InputLabelProps={{shrink: true}} />
          </Stack>

          <Stack direction="row" padding={0.5} spacing={0.5} justifyContent="center" alignItems="center">

            <TextField value={indLift.Lift_axis_2_Actual_Position} size='small' id="outlined-basic" label="Axis-2 Position" style={{ width: 130 }} 
            InputProps={{
              readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px' },
              endAdornment: <InputAdornment position="end">mm</InputAdornment>}} InputLabelProps={{shrink: true}} />

            <TextField value={indLift.Lift_axis_2_Actual_Velocity} size='small' id="outlined-basic" label="Axis-2 Velocity" style={{ width: 127 }} 
            InputProps={{
              readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px' },
              endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} InputLabelProps={{shrink: true}} />
          </Stack>


          <Stack direction="row" paddingTop={0.5} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setliftVelocity(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={indLift.Lift_Settings.Move_speed} size='small' id="outlined-basic" label="Velocity" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>


          <Stack direction="row" paddingTop={0.8} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setliftAcceleration(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/> 

            <TextField value={indLift.Lift_Settings.Move_acc} size='small' id="outlined-basic" label="Acceleration" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
            


              
          </Stack>

          <Stack direction="row" paddingTop={0.8} spacing={0.5}>
          <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setliftDeceleration(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/> 

            <TextField value={indLift.Lift_Settings.Move_dec} size='small' id="outlined-basic" label="Deceleration" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
           
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Lift_axis_1_enable ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>Axis 1 Enabled</Box>
                  <Box sx={{ bgcolor: indLift.Lift_axis_2_enable ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>Axis 2 Enabled</Box>
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Lift_axis_1_servo_action_status ? '#1FFC04' : '#FA1203', p: 0.5, width: '130px' }}>Servo Action</Box>
                  <Box sx={{ bgcolor: indLift.Lift_axis_2_servo_action_status ? '#1FFC04' : '#FA1203', p: 0.5, width: '130px' }}>Servo Action</Box>
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Lift_axis_1_DC_bus_up_status ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>DC Bus Up</Box>
                  <Box sx={{ bgcolor: indLift.Lift_axis_2_DC_bus_up_status ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '130px' }}>DC Bus Up</Box>
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Lift_axis_1_Physical_axis_fault ? '#FA1203' : '#1FFC04', p: 0.5, width: '130px' }}>Physical Axis Fault</Box>
                  <Box sx={{ bgcolor: indLift.Lift_axis_2_Physical_axis_fault ? '#FA1203' : '#1FFC04', p: 0.5, width: '130px'}}>Physical Axis Fault</Box>
          </Stack>

          <Stack spacing={1} padding={0.5} direction='row' >
                  <Box sx={{ bgcolor: indLift.Lift_axis_1_Group_fault ? '#FA1203' : '#1FFC04', p: 0.5, width: '130px' }}>Group Fault</Box>
                  <Box sx={{ bgcolor: indLift.Lift_axis_2_Group_fault ? '#FA1203' : '#1FFC04', p: 0.5, width: '130px' }}>Group Fault</Box>
          </Stack>

      

       


          <Stack direction="row" padding={0.5} spacing={1.5} paddingBottom={2}>
          <Tooltip title="Home"><Fab size="small" variant="contained"
          onMouseDown={() => handleButtonPress('Lift_Settings.Home')}
          onMouseUp={() => handleButtonRelease('Lift_Settings.Home')}>
          <OtherHousesIcon/>
            </Fab></Tooltip>



            <Tooltip title="Reset"><Fab size="small" variant="contained" color="error"
          onMouseDown={() => handleButtonPress('Lift_Settings.Reset')}
          onMouseUp={() => handleButtonRelease('Lift_Settings.Reset')}>
          <RestartAltIcon/>
            </Fab></Tooltip>
          </Stack>


       
        </Box>
        </Grid>


 
    
    </Grid>
  );
}
