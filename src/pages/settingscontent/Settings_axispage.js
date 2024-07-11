import React, { useState} from 'react';
import { Stack, Grid } from '@mui/material';
import { Button, TextField, InputAdornment} from '@mui/material';
import Box from '@mui/material/Box';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function SettingsAllAxis({botAxis, selectedBot }) {

 











// ----------========Textfield Enter Data===========

const [moveVelocity, setMoveVelocity] = useState('');
const [moveAcceleration, setMoveAcceleration] = useState('');
const [moveDeceleration, setMoveDeceleration] = useState('');
const [BinHoldPos, setBinHoldPos] = useState('');
const [BinUnholdPos, setBinUnholdPos] = useState('');
const [MaxTorque, setMaxTorque] = useState('');
const [BLMoveSpeed, setBLMoveSpeed] = useState('');
const [BLmoveAcceleration, setBLmoveAcceleration] = useState('');
const [BLmoveDeceleration, setBLmoveDeceleration] = useState('');
const [BLVerticalPos, setBLVerticalPos] = useState('');
const [BAmoveSpeed, setBAmoveSpeed] = useState('');
const [BAmoveAcceleration, setBAmoveAcceleration] = useState('');
const [BAmoveDeceleration, setBAmoveDeceleration] = useState('');
const [OperatorSideDD, setOperatorSideDD] = useState('');
const [PanelSideDD, setPanelSideDD] = useState('');
const [BLMaxTorq, setBLMaxTorq] = useState('');
const [BA1MaxTorq, setBA1MaxTorq] = useState('');
const [BA2MaxTorq, setBA2MaxTorq] = useState('');




async function postSettingsToApi( 
          moveVelocity, moveAcceleration, moveDeceleration, BinHoldPos, BinUnholdPos, MaxTorque, BLMoveSpeed, BLmoveAcceleration, BLmoveDeceleration, 
          BLVerticalPos, BAmoveSpeed, BAmoveAcceleration, BAmoveDeceleration, OperatorSideDD, PanelSideDD, BLMaxTorq, BA1MaxTorq, BA2MaxTorq) {
  const apiUrl = `http://127.0.0.1:8000/post_settings_bot_axis/${selectedBot}`;
  const data = {
      
      move_speed: moveVelocity,
      move_acceleration: moveAcceleration,
      move_deceleration: moveDeceleration,
      bin_hold_pos: BinHoldPos,
      bin_unhold_pos: BinUnholdPos,
      max_torque: MaxTorque,
      BLmove_speed: BLMoveSpeed,
      BLmove_acceleration: BLmoveAcceleration,
      BLmove_deceleration: BLmoveDeceleration,
      BLvertical_pos: BLVerticalPos,
      BAmove_speed: BAmoveSpeed,
      BAmove_acceleration: BAmoveAcceleration,
      BAmove_deceleration: BAmoveDeceleration,
      operator_side_dd: OperatorSideDD,
      panel_side_dd: PanelSideDD,
      BLmax_torque: BLMaxTorq,
      BA1max_torque: BA1MaxTorq,
      BA2max_torque: BA2MaxTorq,
  
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
      moveVelocity, moveAcceleration, moveDeceleration, BinHoldPos, BinUnholdPos, MaxTorque, BLMoveSpeed, BLmoveAcceleration, BLmoveDeceleration, 
      BLVerticalPos, BAmoveSpeed, BAmoveAcceleration, BAmoveDeceleration, OperatorSideDD, PanelSideDD, BLMaxTorq, BA1MaxTorq, BA2MaxTorq);
  };

  return (
    <Grid container className='App' justifyContent="center" alignItems="center">

      {/* -------------------------------------------Width Adjuster------------------------------------------------------ */}
      <Grid item >
        <Box className="column" style={{ textAlign: "center", backgroundColor: botAxis.X_axis.Status.Motor_Enabled ? '#e6fff2' : '#fff5eb' }} >

          <h1>Bot Width Adjuster</h1>
        <Stack direction="row" spacing={0.5}>
            {botAxis.X_axis.at_home_pos ? <OtherHousesIcon style={{ color: 'green' }} /> : <OtherHousesIcon style={{ color: 'gray' }} />}
            {botAxis.X_axis.Fault ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />}
        </Stack>
    

        <Stack direction="row" paddingTop={2} spacing={0.5}>
          <TextField value={botAxis.X_axis.actual_pos} size='small' id="outlined-basic" label="Actual Position" style={{ width: 140 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
            InputLabelProps={{shrink: true}}/>

          <TextField value={botAxis.X_axis.actual_velocity} label="Actual Velocity" size="small" style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>
        </Stack>

        <Stack direction="row" paddingTop={2} spacing={0.5}>
            <TextField value={botAxis.X_axis.actual_current} label="Actual Current" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">A</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>

            <TextField value={botAxis.X_axis.actual_torque} label="Actual Torque" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">Nm</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>  
          </Stack>

          <Stack direction="row" paddingTop={1.5} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setMoveVelocity(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={botAxis.X_axis.Settings.move_speed} size='small' id="outlined-basic" label="Velocity" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBinHoldPos(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/> 

            <TextField value={botAxis.X_axis.hold_pos} size='small' id="outlined-basic" label="Bin Hold Pos" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>

          <Stack direction="row" paddingTop={1.5} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setMoveAcceleration(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={botAxis.X_axis.Settings.move_acc} size='small' id="outlined-basic" label="Acceleration" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBinUnholdPos(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={botAxis.X_axis.unhold_pos} size='small' id="outlined-basic" label="Bin Unhold Pos" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>

          <Stack direction="row" paddingTop={1.5} spacing={0.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setMoveDeceleration(e.target.value)}
              InputProps={{sx: { backgroundColor: '#fffyf', height: '30px'  }}}/>

            <TextField value={botAxis.X_axis.Settings.move_dec} size='small' id="outlined-basic" label="Deceleration" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setMaxTorque(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={botAxis.X_axis.Settings.max_torque} size='small' id="outlined-basic" label="Max Torque" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>

    

       </Box>
       </Grid>  
     



   
{/* -------------------------------------------Bot Lift------------------------------------------------------ */}



      <Grid item >
      <Box className="column" style={{ textAlign: "center", backgroundColor: botAxis.Z_axis.Status.Motor_Enabled ? '#e6fff2' : '#fff5eb' }} >

<h1>Bot Lift</h1>
<Stack direction="row" spacing={0.5}>
  {botAxis.Z_axis.at_home_pos ? <OtherHousesIcon style={{ color: 'green' }} /> : <OtherHousesIcon style={{ color: 'gray' }} />}
  {botAxis.Z_axis.Fault ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />}
 </Stack>


 <Stack direction="row" paddingTop={2} spacing={0.5}>
<TextField value={botAxis.Z_axis.actual_pos} size='small' id="outlined-basic" label="Actual Position" style={{ width: 140 }} 
  InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
  InputLabelProps={{shrink: true}}/>

<TextField value={botAxis.Z_axis.actual_velocity} label="Actual Velocity" size="small" style={{ width: 140 }}
    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
    InputLabelProps={{shrink: true}}/>
</Stack>

<Stack direction="row" paddingTop={2} spacing={0.5}>
  <TextField value={botAxis.Z_axis.actual_current} label="Actual Current" size="small"  style={{ width: 140 }}
    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">A</InputAdornment>}}
    InputLabelProps={{shrink: true}}/>

  <TextField value={botAxis.Z_axis.actual_torque} label="Actual Torque" size="small"  style={{ width: 140 }}
    InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">Nm</InputAdornment>}}
    InputLabelProps={{shrink: true}}/>  
</Stack>

<Stack direction="row" paddingTop={1.5} spacing={0.5}>
  <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBLMoveSpeed(e.target.value)}
    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

  <TextField value={botAxis.Z_axis.Settings.move_speed} size='small' id="outlined-basic" label="Velocity" style={{ width: 110 }} 
    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
    InputLabelProps={{shrink: true}}/>

  <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBLVerticalPos(e.target.value)}
    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

  <TextField value={botAxis.Z_axis.Settings.target_pos} size='small' id="outlined-basic" label="Vertical Pos" style={{ width: 110 }} 
    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
    InputLabelProps={{shrink: true}}/>

  
</Stack>

<Stack direction="row" paddingTop={1.5} spacing={0.5}>
  <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBLmoveAcceleration(e.target.value)}
    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

  <TextField value={botAxis.Z_axis.Settings.move_acc} size='small' id="outlined-basic" label="Acceleration" style={{ width: 110 }} 
    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
    InputLabelProps={{shrink: true}}/>

  <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBLMaxTorq(e.target.value)}
    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

  <TextField value={botAxis.Z_axis.Settings.max_torque} size='small' id="outlined-basic" label="Max Torque" style={{ width: 110 }} 
    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
    InputLabelProps={{shrink: true}}/>

  
</Stack>

<Stack direction="row" paddingTop={1.5} spacing={0.5}>
  <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBLmoveDeceleration(e.target.value)}
    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

  <TextField value={botAxis.Z_axis.Settings.move_dec} size='small' id="outlined-basic" label="Deceleration" style={{ width: 110 }} 
    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
    InputLabelProps={{shrink: true}}/>

  


</Stack>



</Box>
</Grid>



{/* ----------------------------BOT Arm------------------------------------------------------------------------------------------------------------------------- */}
       

      
      <Grid item xs={11.4} >
      <Box className="column" style={{ textAlign: "center", backgroundColor: '#ffff'  }} >

          <Stack direction="row" spacing={2}>

      <Box className="column" style={{ textAlign: "center", backgroundColor: botAxis.Y_axis_1.Status.Motor_Enabled ? '#e6fff2' : '#fff5eb' }} >

      <h1>Bot Arm 1</h1>
      <Stack direction="row" spacing={0.5}>

      <TextField value={botAxis.Y_axis_1.actual_pos} size='small' id="outlined-basic" label="Actual Position" style={{ width: 140 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
            InputLabelProps={{shrink: true}}/>

        {botAxis.Y_axis_1.at_home_pos ? <OtherHousesIcon style={{ color: 'green' }} /> : <OtherHousesIcon style={{ color: 'gray' }} />}
        {botAxis.Y_axis_1.Fault ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />}
      </Stack>


          <Stack direction="row" paddingTop={1} spacing={0.5}>

          <TextField value={botAxis.Y_axis_1.actual_velocity} label="Actual Velocity" size="small" style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>

          <TextField value={botAxis.Y_axis_1.actual_current} label="Actual Current" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">A</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>
          </Stack>

          <Stack direction="row" paddingTop={1} spacing={0.5}>
           

            <TextField value={botAxis.Y_axis_1.actual_torque} label="Actual Torque" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">Nm</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>  


            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBA1MaxTorq(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={botAxis.Y_axis_1.Settings.max_torque} size='small' id="outlined-basic" label="Max Torque" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>

            
            </Box>


<Box className="column" style={{ textAlign: "center", backgroundColor: botAxis.Y_axis_2.Status.Motor_Enabled ? '#e6fff2' : '#fff5eb' }} >

      <h1>Bot Arm 2</h1>
      <Stack direction="row" spacing={0.5}>

      <TextField value={botAxis.Y_axis_2.actual_pos} size='small' id="outlined-basic" label="Actual Position" style={{ width: 140 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
            InputLabelProps={{shrink: true}}/>

        {botAxis.Y_axis_2.at_home_pos ? <OtherHousesIcon style={{ color: 'green' }} /> : <OtherHousesIcon style={{ color: 'gray' }} />}
        {botAxis.Y_axis_2.Fault ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />}
      </Stack>


          <Stack direction="row" paddingTop={1} spacing={0.5}>

          <TextField value={botAxis.Y_axis_2.actual_velocity} label="Actual Velocity" size="small" style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>

          <TextField value={botAxis.Y_axis_2.actual_current} label="Actual Current" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">A</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>
          </Stack>

          <Stack direction="row" paddingTop={1} spacing={0.5}>
           

            <TextField value={botAxis.Y_axis_2.actual_torque} label="Actual Torque" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">Nm</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>  


            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBA2MaxTorq(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={botAxis.Y_axis_2.Settings.max_torque} size='small' id="outlined-basic" label="Max Torque" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
          </Stack>

            
            </Box>

          </Stack>

 

          <Stack direction="row" paddingTop={1.5} spacing={0.5}>
              <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBAmoveSpeed(e.target.value)}
                InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

              <TextField value={botAxis.Y_axis.Settings.move_speed} size='small' id="outlined-basic" label="Velocity" style={{ width: 110 }} 
                InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                InputLabelProps={{shrink: true}}/>

              <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBAmoveAcceleration(e.target.value)}
                InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

              <TextField value={botAxis.Y_axis.Settings.move_acc} size='small' id="outlined-basic" label="Acceleration" style={{ width: 110 }} 
                InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                InputLabelProps={{shrink: true}}/>

              <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setBAmoveDeceleration(e.target.value)}
                InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

              <TextField value={botAxis.Y_axis.Settings.move_dec} size='small' id="outlined-basic" label="Deceleration" style={{ width: 110 }} 
                InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                InputLabelProps={{shrink: true}}/>
            </Stack>
  

            <Stack direction="row" paddingTop={1.5} spacing={0.5}>
              <TextField variant="outlined" size="small" style={{ width: 80 }} onChange={(e) => setOperatorSideDD(e.target.value)}
                InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

              <TextField value={botAxis.Y_axis.Double_deep_left_pos} size='small' id="outlined-basic" label="Operator side double deep" style={{ width: 150 }} 
                InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
                InputLabelProps={{shrink: true}}/>

              <TextField variant="outlined" size="small" style={{ width: 80 }} onChange={(e) => setPanelSideDD(e.target.value)}
                InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

              <TextField value={botAxis.Y_axis.Double_deep_right_pos} size='small' id="outlined-basic" label="Panel side double deep" style={{ width: 150 }} 
                InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
                InputLabelProps={{shrink: true}}/>

                <Button variant="contained"  onClick={handleFormSubmit}>
                      Submit
                    </Button>
                
              </Stack>
            

        </Box>

      </Grid> 
    </Grid>
  );
}