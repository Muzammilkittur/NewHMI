import React, { useState, useEffect } from 'react';
import { Grid, Box, Stack, TextField, Button, InputAdornment } from '@mui/material';
import axios from 'axios';
import ChargingStationIcon from '@mui/icons-material/ChargingStation';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import SettingsBypass_Module from '../settingscontent/SettingsBypassModule'
import AlertDialog from '../../component/DialogButton';
import Equipment_Module from '../DiagnosticsContent/DiagnosticsEM';

export default function BattIdentiQS() {
  const buttonStyle = { textTransform: 'none', fontSize: 'small' };






  // ----------------PLC Get Main Page-------------------------------------------------------------------------
 
  const [Available, setAvailable] = useState(null);
  const [Connected, setConnected] = useState(null);
  const [HCL_Operational, setHCL_Operational] = useState(null);
  const [NC_Operational, setNC_Operational] = useState(null);
  const [Faulted, setFaulted] = useState(null);

  // Bot Charging
  const [Mover1, setMover1] = useState(null);
  const [Mover2, setMover2] = useState(null);
  const [Bot_assigned1, setBot_assigned1] = useState(null);
  const [Bot_assigned2, setBot_assigned2] = useState(null);
  const [Bot_exit, setBot_exit] = useState(null);

  // Bot Identification
  const [Barcode1, setBarcode1] = useState(null);
  const [Barcode2, setBarcode2] = useState(null);
  const [Barcode3, setBarcode3] = useState(null);
  const [Barcode4, setBarcode4] = useState(null);

  const [MoverID1, setMoverID1] = useState(null);
  const [MoverID2, setMoverID2] = useState(null);
  const [MoverID3, setMoverID3] = useState(null);
  const [MoverID4, setMoverID4] = useState(null);

  const [M1_vel, setM1_vel] = useState(null);
  const [M2_vel, setM2_vel] = useState(null);

 // Button Status
 const [DummyMover1Button, setDummyMover1Button] = useState('');
 const [DummyMover2Button, setDummyMover2Button] = useState('');
  


  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDiagnosticsDO();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const fetchDiagnosticsDO = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/main_batt_identi_QS', {
        headers: {
          'Accept': 'application/json'
        }
      });

  
      setAvailable(response.data.Available);
      setConnected(response.data.Connected);
      setHCL_Operational(response.data.HCL_Operational);
      setNC_Operational(response.data.NC_Operational);
      setFaulted(response.data.Faulted);
      

      setMover1(response.data.Mover1);
      setMover2(response.data.Mover2);
      setBot_assigned1(response.data.Bot_assigned1);
      setBot_assigned2(response.data.Bot_assigned2);
      setBot_exit(response.data.Bot_exit);

      setBarcode1(response.data.Barcode1);
      setBarcode2(response.data.Barcode2);
      setBarcode3(response.data.Barcode3);
      setBarcode4(response.data.Barcode4);
      
      setMoverID1(response.data.MoverID1);
      setMoverID2(response.data.MoverID2);
      setMoverID3(response.data.MoverID3);
      setMoverID4(response.data.MoverID4);

      setM1_vel(response.data.M1_vel);
      setM2_vel(response.data.M2_vel);
//  Button Status
      setDummyMover1Button(response.data.dummymover1);
      setDummyMover2Button(response.data.dummymover2);

     

    } catch (error) {
      console.error('Error fetching tag Get values:', error);
    }
  };

  // --------------------------------------------------------------------------------------------------------------------------



























  // ----------========Textfield Enter Data==============================================
const [postMover1, setpostMover1] = useState('');
const [postMover2, setpostMover2] = useState('');

const [postBotID_Exit, setpostBotID_Exit] = useState('');

const [postBarCode1, setpostBarCode1] = useState('');
const [postBarCode2, setpostBarCode2] = useState('');
const [postBarCode3, setpostBarCode3] = useState('');
const [postBarCode4, setpostBarCode4] = useState('');





async function postMoverID_ToApi() {
  const apiUrl = `http://127.0.0.1:8000/post_main_page`;
  const data = {
    mover_1: postMover1,
    mover_2: postMover2,

    botID_exit: postBotID_Exit,

    bot1_barcode: postBarCode1,
    bot2_barcode: postBarCode2,
    bot3_barcode: postBarCode3,
    bot4_barcode: postBarCode4,
  
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
  // -----================================================================











  //----------------------Buttons PLC Momentary----------------------------------------------------------------------
  

const handleButtonPress = async (tag) => {
    try {
      const response = await fetch(`http://localhost:8000/operate_plc/${tag}/press`, {
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
      const response = await fetch(`http://localhost:8000/operate_plc/${tag}/release`, {
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










  const handleMoverSubmit = () => {
    const dataToPost = {
      mover_1: postMover1,
      mover_2: postMover2,
    };
    postMoverID_ToApi(dataToPost);
  };

  const handleExitSubmit = () => {
    const dataToPost = {
      botID_exit: postBotID_Exit,
    };
    postMoverID_ToApi(dataToPost);
  };



  const handleBarcodeSubmit = () => {
    const dataToPost = {
      bot1_barcode: postBarCode1,
      bot2_barcode: postBarCode2,
      bot3_barcode: postBarCode3,
      bot4_barcode: postBarCode4,
    };
    postMoverID_ToApi(dataToPost);
  };







  return (
    <Grid >
      <Grid container className='App'>

    {/* ------------------Box-01--------------------------------------------------- */}
      <Grid item xs={2.8}>
        <Box className='column' style={{ textAlign: "center", backgroundColor: '#e6fff2'}}>
           <Stack spacing={0.5} padding={0.5}>
            Quick Stick 1
              <Box sx={{ bgcolor: Available? '#1FFC04' : '#E7E7EA', p: 0.2 }}>Ready & Available</Box>
              <Box sx={{ bgcolor: Connected? '#1FFC04' : '#E7E7EA', p: 0.2 }}>Connected</Box>
              <Box sx={{ bgcolor: HCL_Operational? '#1FFC04' : '#E7E7EA', p: 0.2 }}>HCL Operational</Box>
              <Box sx={{ bgcolor: NC_Operational? '#1FFC04' : '#E7E7EA', p: 0.2 }}>NC Operational</Box>
              <Box sx={{ bgcolor: Faulted? '#FA1203' : '#1FFC04', p: 0.2 }}>Faulted</Box>
              </Stack>
        </Box>
      </Grid>


 {/* ------------------Box-02--------------------------------------------------- */}
      <Grid item xs={5.1}>
        <Box className='column' style={{ textAlign: "center", backgroundColor: '#e6fff2'}}>
          <Stack spacing={1} padding={0.5}>
              <Box display="flex" alignItems="center" justifyContent="center" padding={0.5}>
                <ChargingStationIcon />
                <Box ml={1}>Battery Charging</Box>
              </Box>

              <Stack direction="row" padding={0.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setpostMover1(e.target.value)}
                    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

                  <TextField value={Mover1} size='small' id="outlined-basic" label="Mover 1" style={{ width: 80 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} 
                    InputLabelProps={{shrink: true}}/>

                  <TextField value={Bot_assigned1} size='small' id="outlined-basic" label="Bot ID Assigned" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} 
                    InputLabelProps={{shrink: true}}/>

              </Stack>

              <Stack direction="row" padding={0.5} spacing={0.5}>
                  <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setpostMover2(e.target.value)}
                    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

                  <TextField value={Mover2} size='small' id="outlined-basic" label="Mover 2" style={{ width: 80 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} 
                    InputLabelProps={{shrink: true}}/>

                  <TextField value={Bot_assigned2} size='small' id="outlined-basic" label="Bot ID Assigned" style={{ width: 120 }} 
                    InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }}} 
                    InputLabelProps={{shrink: true}}/>

              </Stack>
          </Stack>
          <Button variant="contained" size='small' sx={{ padding: '2px', fontSize: '0.80rem', maxWidth:'10px'}} onClick={handleMoverSubmit}>
                      Submit
                    </Button>
        </Box>
      </Grid>


         {/* ------------------Box-03--------------------------------------------------- */}
         <Grid item xs={2.8}>
      <Box className='column' style={{ textAlign: "center", backgroundColor: '#e6fff2', padding: '16px' }}>
        <Stack spacing={1} alignItems="center">
          <Box display="flex" alignItems="center" justifyContent="center">
            <ExitToAppIcon />
            <Box ml={1} >Bot Exit</Box>
          </Box>

          <Stack direction="row" paddingTop={1.5} paddingBottom={2.9} spacing={0.5} justifyContent="center">
                <TextField variant="outlined" size="small" style={{ width: 55 }} onChange={(e) => setpostBotID_Exit(e.target.value)}
                    InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}} InputLabelProps={{ shrink: true }}/>
                    
                <TextField value={Bot_exit} size='small' id="outlined-basic" label="Bot No" style={{ width: 80 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} InputLabelProps={{ shrink: true }}/>
          </Stack>
        

                    <Button variant="contained" color='error' size='small'
          onMouseDown={() => handleButtonPress('HMI_Bot_Exit')}
          onMouseUp={() => handleButtonRelease('HMI_Bot_Exit')}
          onMouseLeave={() => handleButtonRelease('HMI_Bot_Exit')}
          onClick={handleExitSubmit}>
            
                    Exit
                    </Button>
  
          
        </Stack>
      </Box>
    </Grid>
    </Grid>

{/* -----------------------------------Box 4--------------------------------------------------- */}
<Grid container spacing={1} paddingTop={0.1}>
  <Grid item xs={5.8}> {/* This will take half of the row */}
    <Box className='column' style={{ textAlign: "center", backgroundColor: '#e6fff2', padding: '16px' }}>
      <Stack spacing={1} paddingTop={0.1} alignItems="center">
        <Box display="flex" alignItems="center" justifyContent="center">
          <RememberMeIcon />
          <Box ml={1}>Bot Identification</Box>
        </Box>
        
        <Stack direction="row" spacing={0.5} justifyContent="center">
                <TextField variant="outlined" size="small" label="Bot 1" style={{ width: 55 }} onChange={(e) => setpostBarCode1(e.target.value)}
                    InputProps={{sx: { backgroundColor: '#ffff', height: '25px'  }}} InputLabelProps={{ shrink: true }}/>
                    
                <TextField value={Barcode1} size='small' id="outlined-basic" label="Bar Code Data" style={{ width: 110 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
            
                <TextField value={MoverID1} size='small' id="outlined-basic" label="Mover ID Assigned" style={{ width: 130 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
         
          </Stack>

          <Stack direction="row" spacing={0.5} justifyContent="center">
                <TextField variant="outlined" size="small" label="Bot 2" style={{ width: 55 }} onChange={(e) => setpostBarCode2(e.target.value)}
                    InputProps={{sx: { backgroundColor: '#ffff', height: '25px'  }}} InputLabelProps={{ shrink: true }}/>
                    
                <TextField value={Barcode2} size='small' id="outlined-basic" style={{ width: 110 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
            
                <TextField value={MoverID2} size='small' id="outlined-basic" style={{ width: 130 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
         
          </Stack>

          <Stack direction="row" spacing={0.5} justifyContent="center">
                <TextField variant="outlined" size="small" label="Bot 3" style={{ width: 55 }} onChange={(e) => setpostBarCode3(e.target.value)}
                    InputProps={{sx: { backgroundColor: '#ffff', height: '25px'  }}} InputLabelProps={{ shrink: true }}/>
                    
                <TextField value={Barcode3} size='small' id="outlined-basic" style={{ width: 110 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
            
                <TextField value={MoverID3} size='small' id="outlined-basic" style={{ width: 130 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
         
          </Stack>

          <Stack direction="row" spacing={0.5} justifyContent="center">
                <TextField variant="outlined" size="small" label="Bot 4" style={{ width: 55 }} onChange={(e) => setpostBarCode4(e.target.value)}
                    InputProps={{sx: { backgroundColor: '#ffff', height: '25px'  }}} InputLabelProps={{ shrink: true }}/>
                    
                <TextField value={Barcode4} size='small' id="outlined-basic" style={{ width: 110 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
            
                <TextField value={MoverID4} size='small' id="outlined-basic" style={{ width: 130 }} 
                    InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '25px' } }} InputLabelProps={{ shrink: true }}/>
         
          </Stack>
          
          <Button variant="contained" size='small' sx={{ padding: '2px', fontSize: '0.80rem'}} onClick={handleBarcodeSubmit}>
                      Submit
                    </Button>
      </Stack>
    </Box>
  </Grid>

  <Grid item xs={5.8}> {/* This will take half of the row */}
    <Box className='column' style={{ textAlign: "center", backgroundColor: '#e6fff2', padding: '16px' }}>

      <Stack direction='row' alignItems="center">
          <Button variant="contained" color="primary" sx={buttonStyle}
             onMouseDown={() => handleButtonPress('Mover_ID[01].Dummy_Mover')}
             onDoubleClick={() => handleButtonRelease('Mover_ID[01].Dummy_Mover')}
             style={{ backgroundColor: DummyMover1Button ? '#1FFC04' : '' }}>Mover 1 Active</Button>
         
         <Button variant="contained" color="primary" sx={buttonStyle}
            onMouseDown={() => handleButtonPress('Mover_ID[02].Dummy_Mover')}
            onDoubleClick={() => handleButtonRelease('Mover_ID[02].Dummy_Mover')}
            style={{ backgroundColor: DummyMover2Button ? '#1FFC04' : '' }}>Mover 2 Active</Button>
      </Stack>

      <Stack spacing={1} padding={0.5} direction='row' alignItems="center">
          <Button size='small' variant='contained' sx={buttonStyle}
           onMouseDown={() => handleButtonPress('Machine_Reset_ON')}
           onMouseUp={() => handleButtonRelease('Machine_Reset_ON')}
           onMouseLeave={() => handleButtonRelease('Machine_Reset_ON')}
           >Machine Reset ON</Button>
      </Stack>

      

      <Stack spacing={1} padding={0.5} direction='row' alignItems="center">
          <TextField value={M1_vel} size='small' id="outlined-basic" label="Mover 1 Act Vel" style={{ width: 130 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0',  height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

          <TextField value={M2_vel} size='small' id="outlined-basic" label="Mover 2 Act Vel" style={{ width: 130 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0',  height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
                    InputLabelProps={{shrink: true}}/>
      </Stack>
      
      <Stack spacing={0.5} padding={0.5} direction='column' alignItems="center">
          <AlertDialog buttonName="Bypass Module" Title='Bypass Module' contentComponent={SettingsBypass_Module} />
          <AlertDialog buttonName="Equipment Module" Title='Equipment Module' contentComponent={Equipment_Module} />
      </Stack>

    </Box>
  </Grid>
</Grid>



    </Grid>
  );
}     
