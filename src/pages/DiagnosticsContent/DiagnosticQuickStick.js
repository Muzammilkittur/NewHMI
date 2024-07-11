import React from 'react';
import { Grid, Box, Stack, TextField } from '@mui/material';

export default function DiagnosticsQuickStick({ idle, faulted, hlcOperational, ncOperational, connecting, disconnecting, configuring, alarm, ready, errorCode}) {
  return (
    <Grid container className='App column' style={{ backgroundColor: '#e6fff2'}}>

      
       <Grid item xs={12} paddingTop={0.5}>
        <Box sx={{ textAlign: 'center'}}><h2>Quick Stick</h2></Box>
      </Grid>

    {/* ------------------Box-01--------------------------------------------------- */}
    <Stack direction='column' className='column' >
      <h1>Magnemotion Device Status</h1>
    <Grid item >
        <Box style={{ textAlign: "center"}}>
          <Stack  spacing={1} padding={0.5} direction='row'>

            <Box sx={{ bgcolor: faulted ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Initializing</Box>
            <Box sx={{ bgcolor: disconnecting ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Connected</Box>
            <Box sx={{ bgcolor: disconnecting ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Disconnected</Box>
            <Box sx={{ bgcolor: idle ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Idle</Box>
            <Box sx={{ bgcolor: hlcOperational ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>HLC Operational</Box>
            
           
          </Stack>


        </Box>
      </Grid>

      {/* ------------------Box-02--------------------------------------------------- */}
      <Grid item >
        <Box style={{ textAlign: "center"}}>
          <Stack  spacing={1.5} padding={0.5} direction='row'>
          
          <Box sx={{ bgcolor: faulted ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '70px' }}>Faulted</Box>
          <Box sx={{ bgcolor: disconnecting ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '110px' }}>Disconnecting</Box>
          <Box sx={{ bgcolor: connecting ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '100px' }}>Connecting</Box>
          <Box sx={{ bgcolor: configuring ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '107px' }}>Configuring</Box>
          
    


          </Stack>

        </Box>
      </Grid>

       {/* ------------------Box-02--------------------------------------------------- */}
       
       <Grid item >
        <Box style={{ textAlign: "center"}}>
          <Stack  spacing={1} padding={0.5} direction='row'>
          
          <Box sx={{ bgcolor: alarm ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Alarm</Box>
          <Box sx={{ bgcolor: ncOperational ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>NC Operational</Box>
          <Box sx={{ bgcolor: ready ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Ready & Available</Box>
          
    
          <TextField value={errorCode} variant="outlined" label="Error Code" size="small"  style={{ width: 122 }} 
                InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }}}
                InputLabelProps={{shrink: true}}/>

          </Stack>

        </Box>
      </Grid>
      </Stack>
     


    {/* ------------------Box-03--------------------------------------------------- */}
    
    <Stack direction='column' className='column' >
    <Grid item >
        <Box style={{ textAlign: "center"}}>
          <h1>Configure Magnemotion Device Handler Status</h1>
          <Stack  spacing={2} padding={0.5} direction='row'>
          <Box sx={{ bgcolor: ready ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '70px' }}>Enabled</Box>
          <Box sx={{ bgcolor: ready ? '#1FFC04' : '#E7E7EA', p: 0.5, width: '100px' }}>In Progress</Box>
          <Box sx={{ bgcolor: ready ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Process Complete</Box>
          <Box sx={{ bgcolor: ready ? '#FA1203' : '#E7E7EA', p: 0.5, width: '70px' }}>Error</Box>
          
          </Stack>

        </Box>
      </Grid>
      </Stack>
    </Grid>
  );
}
