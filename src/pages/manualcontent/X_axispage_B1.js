import React, { useState} from 'react';
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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


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

export default function FloatingActionButtonZoom({ SelectedBot, SelectedAxis, botData }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  

//----------------------Buttons PLC Momentary----------------------------------------------------------------------
  

const handleButtonPress = async (tag) => {
    try {
      const response = await fetch(`http://localhost:8000/manual_bot_plc/${tag}/press/${SelectedBot}/${SelectedAxis}`, {
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
      const response = await fetch(`http://localhost:8000/manual_bot_plc/${tag}/release/${SelectedBot}/${SelectedAxis}`, {
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
const [jogVelocity, setJogVelocity] = useState('');
const [jogAcceleration, setJogAcceleration] = useState('');
const [jogDeceleration, setJogDeceleration] = useState('');
const [homeVelocity, sethomeVelocity] = useState('');
const [homeAcceleration, sethomeAcceleration] = useState('');
const [homeDeceleration, sethomeDeceleration] = useState('');
const [moveVelocity, setMoveVelocity] = useState('');
const [moveAcceleration, setMoveAcceleration] = useState('');
const [moveDeceleration, setMoveDeceleration] = useState('');
const [MaxTorque, setMaxTorque] = useState('');
const [TargetPos, setTargetPos] = useState('');




async function postJogSpeedToApi( jogVelocity, jogAcceleration, jogDeceleration, homeVelocity, homeAcceleration, homeDeceleration,
          moveVelocity, moveAcceleration, moveDeceleration, MaxTorque, TargetPos) {
  const apiUrl = `http://127.0.0.1:8000/post_manual_bot_axis/${SelectedBot}/${SelectedAxis}`;
  const data = {
      jog_speed: jogVelocity,
      jog_acceleration: jogAcceleration,
      jog_deceleration: jogDeceleration,
      home_speed: homeVelocity,
      home_acceleration: homeAcceleration,
      home_deceleration: homeDeceleration,
      move_speed: moveVelocity,
      move_acceleration: moveAcceleration,
      move_deceleration: moveDeceleration,
      max_torque: MaxTorque,
      target_pos: TargetPos,
  
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
        
      } else {
        console.error('Failed to post data to the API.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
}
  // -----===============






  
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  








  const handleFormSubmit = () => {
    postJogSpeedToApi(jogVelocity, jogAcceleration, jogDeceleration, homeVelocity, homeAcceleration, homeDeceleration,
      moveVelocity, moveAcceleration, moveDeceleration, MaxTorque, TargetPos);
  };



  

  return (
    <Grid container className='App' >
      <Grid item xs={8.5} sm={6.5} lg={6}>
      <Box className="column" style={{ textAlign: "center", backgroundColor: botData.enabledstatus ? '#e6fff2' : '#fff5eb' }} sx={{ minHeight: 330}}>

      <h2>Bot {SelectedBot} Axis {SelectedAxis} </h2>

        <Stack direction="row" paddingTop={0.5} spacing={0.5}>

            <Button variant="contained" color={isEnabled ? "success" : "inherit"}
            onMouseDown={() => {setIsEnabled(true); handleButtonPress('Cmd_enable');}}
            onMouseUp={() => handleButtonRelease('Cmd_enable')}>Enable</Button>
			
			      <Button variant="contained" color={isEnabled ? "inherit" : "warning"}
            onMouseDown={() => {setIsEnabled(false); handleButtonPress('Cmd_disable');}}
            onMouseUp={() => handleButtonRelease('Cmd_disable')}>Disable</Button>


            {botData.bothomestatus ? <OtherHousesIcon style={{ color: 'green' }} /> : <OtherHousesIcon style={{ color: 'gray' }} />}
            {botData.botfault ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />}
            
            
        </Stack>
        

        <Stack direction="row" paddingTop={2} spacing={0.5}>
          <TextField  size='small' id="outlined-basic" value={botData.actualBot_position} label="Actual Position" style={{ width: 140 }} 
            InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
            InputLabelProps={{shrink: true}}/>

          <TextField value={botData.actualBot_velocity} label="Actual Velocity" size="small" style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>
        </Stack>

        <Stack direction="row" paddingTop={2} spacing={0.5}>
            <TextField value={botData.actualBot_current} label="Actual Current" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">A</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>

            <TextField value={botData.actualBot_torque} label="Actual Torque" size="small"  style={{ width: 140 }}
              InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">Nm</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>  
          </Stack>
          

          <Stack direction="row" padding={1.5} spacing={0.5}>
          <TextField variant="outlined" size="small" style={{ width: 70 }} onChange={(e) => setMaxTorque(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField value={botData.maxtorq} size='small' id="outlined-basic" label="Max Torque" style={{ width: 130 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">Nm</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>

          <Tooltip title="Reset"><Fab size="small" variant="contained" color="error"
            onMouseDown={() => handleButtonPress('Cmd_reset')}
            onMouseUp={() => handleButtonRelease('Cmd_reset')}><RestartAltIcon/></Fab></Tooltip>


          </Stack>
          <Button variant="contained" onClick=   {handleFormSubmit}>
                  Submit
                </Button>
          
    
      </Box>
      </Grid>


  {/* ------------------JOG, HOME, MOVE--------------------------------------------------- */}
      <Grid item xs={8.5} sm={6.5} lg={5.2}>
      <Box style={{ textAlign: "center", backgroundColor: botData.enabledstatus ? '#e6fff2' : '#fff5eb' }} sx={{bgcolor: 'background.paper', minHeight: 330}}> 
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
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* --------------JOG----------------------------------------------- */}
            <div className="column" style={{ textAlign: "center" }}>
                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setJogVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' id="outlined-basic" value={botData.jogvel} label="Jog Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setJogAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' id="outlined-basic" value={botData.jogacc} label="Jog Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setJogDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' id="outlined-basic" value={botData.jogdec} label="Jog Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>
        

                <Stack direction="row" paddingTop={2} spacing={2}>
                <Tooltip title="Jogg Increase">
                      <Fab size="small" variant="contained" 
                      onMouseDown={() => handleButtonPress('Cmd_jog_fwd')}
                      onMouseUp={() => handleButtonRelease('Cmd_jog_fwd')}><AddIcon /></Fab>
                  </Tooltip>

                  <Tooltip title="Jogg Decrease">
                      <Fab size="small" variant="contained"
                      onMouseDown={() => handleButtonPress('Cmd_jog_rev')}
                      onMouseUp={() => handleButtonRelease('Cmd_jog_rev')}><RemoveIcon/></Fab>
                  </Tooltip>
              </Stack>
            </div>
          </TabPanel>
          {/* --------------------------------------------------------------------------------------- */}




 {/* -------------HOME------------------------------------------------ */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="column" style={{ textAlign: "center" }}>
            <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => sethomeVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' id="outlined-basic" value={botData.homevel} label="Homing Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => sethomeAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' id="outlined-basic" value={botData.homeacc} label="Homing Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => sethomeDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' id="outlined-basic" value={botData.homedec} label="Homing Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>        
                  <Button variant="contained" color="inherit"
                  onMouseDown={() => handleButtonPress('Cmd_home')}
                  onMouseUp={() => handleButtonRelease('Cmd_home')}><OtherHousesIcon/>Home</Button>
              </Stack>
            </div>
          </TabPanel>
{/* --------------------------------------------------------------------------------------- */}






{/* -------------MOVE------------------------------------------------ */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="column" style={{ textAlign: "center" }}>
            <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setMoveVelocity(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField size='small' id="outlined-basic" value={botData.movevel} label="Moving Velocity" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField  variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setMoveAcceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' id="outlined-basic" value={botData.moveacc} label="Moving Acceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 60 }} onChange={(e) => setMoveDeceleration(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField  size='small' id="outlined-basic" value={botData.movedec} label="Moving Deceleration" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">%</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
                </Stack>

                <Stack direction="row" paddingTop={1.5} spacing={0.5}>
              <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setTargetPos(e.target.value)}
                        InputProps={{sx: { backgroundColor: '#ffff' }}}/>

                  <TextField value={botData.targPos} size='small' id="outlined-basic" label="Target Position" style={{ width: 95 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0' }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>

                  <Tooltip title= "Move to Target Pos">
                    <Fab size="small" variant="contained"
                    onMouseDown={() => handleButtonPress('Cmd_move')}
                    onMouseUp={() => handleButtonRelease('Cmd_move')}><FiberManualRecordIcon/></Fab>
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
