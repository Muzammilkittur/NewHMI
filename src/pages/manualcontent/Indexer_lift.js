import React, { useState } from 'react';
import {Stack, Button,Grid} from '@mui/material';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import { Typography, TextField, Fab, InputAdornment, Tooltip} from '@mui/material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

export default function ManualindLift({ SelectedBot, Indlift_Data }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [isEnabledind, setIsEnabledind] = useState(false);
  const [isEnabledlift, setIsEnabledlift] = useState(false);
  
  


  const postTabValue = async (value) => {
    try {
      const response = await fetch(`http://localhost:8000/indLiftTab/${SelectedBot}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tab_value: value }),
      });
      if (response.ok) {
        console.log(`Tab ${value} selected. Command sent to PLC.`);
      } else {
        console.error('Failed to send tab value to PLC.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

											 
					   
																				   
	

										
					
																				
	













  //----------------------Buttons PLC Momentary----------------------------------------------------------------------
  

const handleButtonPress = async (indtag) => {
    try {
      const response = await fetch(`http://localhost:8000/indLiftButton_plc/${indtag}/press/${SelectedBot}`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log(`Button pressed for tag ${indtag}. Command sent to PLC.`);
      } else {
        console.error('Failed to send command to PLC.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };




  const handleButtonRelease = async (indtag) => {
    try {
      const response = await fetch(`http://localhost:8000/indLiftButton_plc/${indtag}/release/${SelectedBot}`, {
        method: 'POST',
      });
      if (response.ok) {
        console.log(`Button released for tag ${indtag}. Tag value set to zero.`);
      } else {
        console.error('Failed to reset tag value.');
      }
    } catch (error) {
      alert(`Error sending ${indtag} command: ${error.message}`);
    }
  };
// -----------------------end-Buttons PLC Momentary-----------------------------------------------------------------------------














 // ----------========Post Ind Lift Textfields===========-------------------------------------------------------------
 const [jogVelocity, setJogVelocity] = useState('');
 const [jogAcceleration, setJogAcceleration] = useState('');
 const [jogDeceleration, setJogDeceleration] = useState('');
 const [HomeVelocity, setHomeVelocity] = useState('');
 const [HomeAcceleration, setHomeAcceleration] = useState('');
 const [HomeDeceleration, setHomeDeceleration] = useState('');
 const [MoveVelocity, setMoveVelocity] = useState('');
 const [MoveAcceleration, setMoveAcceleration] = useState('');
 const [MoveDeceleration, setMoveDeceleration] = useState('');
 const [IndMovePosition, setIndMovePosition] = useState('');
// Lift
 const [LiftjogVelocity, setLiftJogVelocity] = useState('');
 const [LiftjogAcceleration, setLiftJogAcceleration] = useState('');
 const [LiftjogDeceleration, setLiftJogDeceleration] = useState('');
 const [LiftHomeVelocity, setLiftHomeVelocity] = useState('');
 const [LiftHomeAcceleration, setLiftHomeAcceleration] = useState('');
 const [LiftHomeDeceleration, setLiftHomeDeceleration] = useState('');
 const [LiftMoveVelocity, setLiftMoveVelocity] = useState('');
 const [LiftMoveAcceleration, setLiftMoveAcceleration] = useState('');
 const [LiftMoveDeceleration, setLiftMoveDeceleration] = useState('');
 const [LiftMovePosition, setMovePosition] = useState('');
 
 
 
 
 
 
 async function postJogSpeedToApiIndLift( jogVelocity, jogAcceleration, jogDeceleration, HomeVelocity, HomeAcceleration, HomeDeceleration, MoveVelocity, MoveAcceleration, MoveDeceleration, IndMovePosition,
                                  LiftjogVelocity, LiftjogAcceleration, LiftjogDeceleration, LiftHomeVelocity, LiftHomeAcceleration, LiftHomeDeceleration, LiftMoveVelocity, LiftMoveAcceleration, LiftMoveDeceleration, LiftMovePosition
                                  ) {
   const apiUrl = `http://127.0.0.1:8000/post_manual_ind_lift/${SelectedBot}`;
   const data = {
       indjog_speed: jogVelocity,
       indjog_acceleration: jogAcceleration,
       indjog_deceleration: jogDeceleration,
       indhome_speed: HomeVelocity,
       indhome_acceleration: HomeAcceleration,
       indhome_deceleration: HomeDeceleration,
       indmove_speed: MoveVelocity,
       indmove_acceleration: MoveAcceleration,
       indmove_deceleration: MoveDeceleration,
       indmove_position: IndMovePosition,
      //  Lift
       liftjog_speed: LiftjogVelocity,
       liftjog_acceleration: LiftjogAcceleration,
       liftjog_deceleration: LiftjogDeceleration,
       lifthome_speed: LiftHomeVelocity,
       lifthome_acceleration: LiftHomeAcceleration,
       lifthome_deceleration: LiftHomeDeceleration,
       liftmove_speed: LiftMoveVelocity,
       liftmove_acceleration: LiftMoveAcceleration,
       liftmove_deceleration: LiftMoveDeceleration,
       liftmove_position: LiftMovePosition,
   
     };
   
     try {
       const response = await fetch(apiUrl, {
         method: 'POSt',
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
    postJogSpeedToApiIndLift(
      jogVelocity, jogAcceleration, jogDeceleration, HomeVelocity, HomeAcceleration, HomeDeceleration, MoveVelocity, MoveAcceleration, MoveDeceleration, IndMovePosition,
      LiftjogVelocity, LiftjogAcceleration, LiftjogDeceleration, LiftHomeVelocity, LiftHomeAcceleration, LiftHomeDeceleration, LiftMoveVelocity, LiftMoveAcceleration, LiftMoveDeceleration, LiftMovePosition
    );
  };
  










  const handleChange = (event, newValue) => {
    setValue(newValue);
    postTabValue(newValue + 1); 
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    postTabValue(index + 1); 
  };
  

  

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} lg={4.5} padding={1}> 
      <Box className="column" style={{ textAlign: "center", backgroundColor: Indlift_Data.Indexer_enable ? '#e6fff2' : '#fff5eb' }}>

        <h4>Indexer {SelectedBot}, mode {Indlift_Data.Mode}</h4>
      
        
  
        <Stack direction="row" padding={1} spacing={0.5}>


            <Button variant="contained" color={isEnabledind ? "success" : "inherit"}
            onMouseDown={() => {setIsEnabledind(true); handleButtonPress('Indexer_Manual.Enable');}}
            onMouseUp={() => handleButtonRelease('Indexer_Manual.Enable')}>Enable</Button>
			
			      <Button variant="contained" color={isEnabledind ? "inherit" : "warning"}
            onMouseDown={() => {setIsEnabledind(false); handleButtonPress('Indexer_Manual.Disable');}}
            onMouseUp={() => handleButtonRelease('Indexer_Manual.Disable')}>Disable</Button>
            

            {Indlift_Data.Indexer_fault ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />}
            
            
        </Stack>
      

          <Stack direction="row" padding={0.5} spacing={0.5}>
          <TextField
                    size='small'
                    id="outlined-disabled"
                    label="Position"
                    value={Indlift_Data.Indexer_Actual_Position}
                    style={{ width: 127 }}
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg</InputAdornment>}}
            InputLabelProps={{shrink: true}} />

          <TextField
                    size='small'
                    id="outlined-disabled"
                    label="Velocity"
                    value={Indlift_Data.Indexer_Actual_Velocity}
                    style={{ width: 127 }}
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s</InputAdornment>}}
            InputLabelProps={{shrink: true}} />
          </Stack>

          <Stack direction="row" padding={0.5} spacing={1.5} paddingBottom={1}>
          <Fab size="small" variant="contained" color="error"
          onMouseDown={() => handleButtonPress('Indexer_Manual.Reset')}
          onMouseUp={() => handleButtonRelease('Indexer_Manual.Reset')}>
          <Tooltip title="Reset"><RestartAltIcon/></Tooltip>
            </Fab>

          </Stack>

        </Box>
			 

        


        <Box className="column" style={{ textAlign: "center", backgroundColor: Indlift_Data.Lift_axis_1_enable && Indlift_Data.Lift_axis_2_enable ? '#e6fff2' : '#fff5eb' }}>
        <h4>Lift {SelectedBot}</h4>
        <Stack direction="row" padding={1} spacing={0.5}>

            <Button variant="contained" color={isEnabledlift ? "success" : "inherit"}
            onMouseDown={() => {setIsEnabledlift(true); handleButtonPress('Lift_Manual.Enable');}}
            onMouseUp={() => handleButtonRelease('Lift_Manual.Enable')}>Enable</Button>
			
			      <Button variant="contained" color={isEnabledlift ? "inherit" : "warning"}
            onMouseDown={() => {setIsEnabledlift(false); handleButtonPress('Lift_Manual.Disable');}}
            onMouseUp={() => handleButtonRelease('Lift_Manual.Disable')}>Disable</Button>

          <Fab size="small" variant="contained" color="error"
            onMouseDown={() => handleButtonPress('Lift_Manual.Reset')}
            onMouseUp={() => handleButtonRelease('Lift_Manual.Reset')}><Tooltip title="Reset"><RestartAltIcon/></Tooltip>
          </Fab>
        </Stack>


          <Stack spacing={1} padding={1} direction='row' >
                  <Box sx={{ bgcolor: Indlift_Data.Lift_axis_1_enable ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '125px' }}>Axis 1 Enabled</Box>
                  <Box sx={{ bgcolor: Indlift_Data.Lift_axis_2_enable ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '125px' }}>Axis 2 Enabled</Box>
          </Stack>
          <Stack direction="row" padding={0.5} spacing={0.5} justifyContent="center" alignItems="center">

          <TextField value={Indlift_Data.Lift_axis_1_Actual_Position} size='small' id="outlined-disabled" label="Axis-1 Position" style={{ width: 127 }}
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
            InputLabelProps={{shrink: true}}/>

          <TextField value={Indlift_Data.Lift_axis_2_Actual_Position} size='small' id="outlined-basic" label="Axis-2 Position" style={{ width: 130 }} 
            InputProps={{
              readOnly:true, sx: { backgroundColor: '#f0f0f0' },
              endAdornment: <InputAdornment position="end">mm</InputAdornment>}} InputLabelProps={{shrink: true}} />
          </Stack>

          <Stack direction="row" padding={0.5} spacing={0.5} justifyContent="center" alignItems="center">

           

          <TextField type="number" value={Indlift_Data.Lift_axis_1_Actual_Velocity} size='small' id="outlined-basic" label="Axis-1 Velocity" style={{ width: 127 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
            InputLabelProps={{shrink: true}} />

            <TextField value={Indlift_Data.Lift_axis_2_Actual_Velocity} size='small' id="outlined-basic" label="Axis-2 Velocity" style={{ width: 127 }} 
            InputProps={{
              readOnly:true, sx: { backgroundColor: '#f0f0f0' },
              endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} InputLabelProps={{shrink: true}} />
          </Stack>

          <Button variant="contained" onClick={handleFormSubmit}>
                  Submit
                </Button>
        </Box>
        </Grid>


  {/* ------------------JOG, HOME, MOVE--------------------------------------------------- */}
      <Grid item xs={12} sm={6} lg={4.5} >
      <Box style={{ textAlign: "center" }} sx={{bgcolor: 'background.paper'}} >
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="JOG" {...a11yProps(0)} />
            <Tab label="HOME" {...a11yProps(1)} />
            <Tab label="MOVE" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
       <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>

            {/* --------------JOG----------------------------------------------- */}

            


          <TabPanel value={value} index={0} dir={theme.direction}>
          
            <div className="column" style={{textAlign: "center", backgroundColor: Indlift_Data.Indexer_enable ? '#e6fff2' : '#fff5eb'}}>



            <h4>Indexer {SelectedBot}</h4>
                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setJogVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' value={Indlift_Data.IndJogVel} id="outlined-basic"  label="Jog Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setJogAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.IndJogAcc} id="outlined-basic"  label="Jog Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setJogDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.IndJogDec} id="outlined-basic"  label="Jog Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>
                

                <Stack direction="row" paddingTop={0.5} paddingBottom={1} spacing={2}>
                  <Tooltip title="Jogg Increase">
                      <Fab size="small" variant="contained" 
                      onMouseDown={() => handleButtonPress('Indexer_Manual.Jog_Fwd')}
                      onMouseUp={() => handleButtonRelease('Indexer_Manual.Jog_Fwd')}><AddIcon /></Fab>
                  </Tooltip>

                  <Tooltip title="Jogg Decrease">
                      <Fab size="small" variant="contained"
                      onMouseDown={() => handleButtonPress('Indexer_Manual.Jog_Rev')}
                      onMouseUp={() => handleButtonRelease('Indexer_Manual.Jog_Rev')}><RemoveIcon/></Fab>
                  </Tooltip>

                </Stack>
              </div>
					   
																																															 

              <div className="column" style={{textAlign: "center", backgroundColor: Indlift_Data.Lift_axis_1_enable && Indlift_Data.Lift_axis_2_enable ? '#e6fff2' : '#fff5eb'}}>
              <h4>Lift {SelectedBot}</h4>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftJogVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' value={Indlift_Data.LiftJogVel} id="outlined-basic"  label="Jog Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftJogAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.LiftJogAcc} id="outlined-basic"  label="Jog Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftJogDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.LiftJogDec} id="outlined-basic"  label="Jog Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={0.5} paddingBottom={1} spacing={2}>
                  <Tooltip title="Jogg Increase">
                      <Fab size="small" variant="contained" 
                      onMouseDown={() => handleButtonPress('Lift_Manual.Jog_Fwd')}
                      onMouseUp={() => handleButtonRelease('Lift_Manual.Jog_Fwd')}><AddIcon /></Fab>
                  </Tooltip>

                  <Tooltip title="Jogg Decrease">
                      <Fab size="small" variant="contained"
                      onMouseDown={() => handleButtonPress('Lift_Manual.Jog_Rev')}
                      onMouseUp={() => handleButtonRelease('Lift_Manual.Jog_Rev')}><RemoveIcon/></Fab>
                  </Tooltip>

                </Stack>
                
            </div>
          </TabPanel>
          {/* --------------------------------------------------------------------------------------- */}




 {/* -------------HOME------------------------------------------------ */}
          <TabPanel value={value} index={1} >
          <div className="column" style={{textAlign: "center", backgroundColor: Indlift_Data.Indexer_enable ? '#e6fff2' : '#fff5eb'}}>
          <h4>Indexer {SelectedBot}</h4>
               <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setHomeVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' value={Indlift_Data.IndHomeVel} id="outlined-basic"  label="Home Velocity" style={{ width: 120 }} 
									   
										 
										  
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setHomeAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.IndHomeAcc} id="outlined-basic"  label="Home Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" padding={2} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setHomeDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.IndHomeDec} id="outlined-basic"  label="Home Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>
            </div>

            <div className="column" style={{textAlign: "center", backgroundColor: Indlift_Data.Lift_axis_1_enable && Indlift_Data.Lift_axis_2_enable ? '#e6fff2' : '#fff5eb'}}>
            <h4>Lift {SelectedBot}</h4>
              <Stack direction="row" paddingTop={2} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftHomeVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' value={Indlift_Data.LiftHomeVel} id="outlined-basic"  label="Home Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftHomeAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.LiftHomeAcc} id="outlined-basic"  label="Home Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftHomeDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.LiftHomeDec} id="outlined-basic"  label="Home Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" padding={2.7} spacing={0.5}>

                  <Button variant="contained" color="inherit"
									   
								   
                  onMouseDown={() => handleButtonPress('Lift_Manual.Home')}
                  onMouseUp={() => handleButtonRelease('Lift_Manual.Home')}><OtherHousesIcon/>Home Lift</Button>
              </Stack>
            </div>
          </TabPanel>
{/* --------------------------------------------------------------------------------------- */}






{/* -------------MOVE------------------------------------------------ */}
          <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="column" style={{textAlign: "center", backgroundColor: Indlift_Data.Indexer_enable ? '#e6fff2' : '#fff5eb'}}>
          <h4>Indexer {SelectedBot}</h4>
              <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setMoveVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' value={Indlift_Data.IndMoveVel} id="outlined-basic"  label="Move Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>
					
					   
																																															 

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setMoveAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.IndMoveAcc} id="outlined-basic"  label="Move Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setMoveDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.IndMoveDec} id="outlined-basic"  label="Move Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setIndMovePosition(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.IndMovPos} id="Move Position"  label="Move Position" style={{ width: 120 }}  
                        InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">deg</InputAdornment>}} 
                        InputLabelProps={{shrink: true}}/>
                
                 
                  <Tooltip title= "Move Indexer">
                    <Fab size="small" variant="contained"
                    onMouseDown={() => handleButtonPress('Indexer_Manual.Move')}
                    onMouseUp={() => handleButtonRelease('Indexer_Manual.Move')}><FiberManualRecordIcon/></Fab>
                  </Tooltip> 
              </Stack>
            </div>

            <div className="column" style={{textAlign: "center", backgroundColor: Indlift_Data.Lift_axis_1_enable && Indlift_Data.Lift_axis_2_enable ? '#e6fff2' : '#fff5eb'}}>

            <h4>Lift {SelectedBot}</h4>
              <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftMoveVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' value={Indlift_Data.LiftMoveVel} id="outlined-basic"  label="Move Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftMoveAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.LiftMoveAcc} id="outlined-basic"  label="Move Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setLiftMoveDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.LiftMoveDec} id="outlined-basic"  label="Move Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s²</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>


              <Stack direction="row" paddingTop={1} paddingBottom={1} spacing={1}>

                  <TextField variant="outlined" size="small" style={{ width: 55 }} onChange={(e) => setMovePosition(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' value={Indlift_Data.LiftMovPos} id="Move Position"  label="Move Position" style={{ width: 115 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>


                  <Tooltip title= "Move Lift">
                    <Fab size="small" variant="contained"
                    onMouseDown={() => handleButtonPress('Lift_Manual.Move')}
                    onMouseUp={() => handleButtonRelease('Lift_Manual.Move')}
                    onMouseLeave={() => handleButtonRelease('Lift_Manual.Move')}>
                    <FiberManualRecordIcon/>
                    </Fab>
                  </Tooltip> 
              </Stack>


            </div>
          </TabPanel>
{/* --------------------------------------------------------------------------------------- */}




        </SwipeableViews>
      </Box>
      </Grid>
    </Grid>
  );
}
