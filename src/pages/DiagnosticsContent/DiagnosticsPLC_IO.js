import React from 'react';
import { Grid, Box, Stack } from '@mui/material';

export default function DiagnosticsPLCIO({selectedBot, EmergencyStop, Start, LiftHome, OverTravel, ForkArm1Home, ForkArm2Home, ForkArm1LH, ForkArm2LH, ForkArm1RH, ForkArm2RH, WidthAdjusterHome, WidthAdjusterEnd, BinPresent }) {
  return (
    <Grid container className='App column' style={{ backgroundColor: '#e6fff2'  }}>

       {/* Text at top center */}
       <Grid item xs={12} paddingTop={0.5}>
        <Box sx={{ textAlign: 'center'}}><h2>Bot : {selectedBot} PLC IO</h2></Box>
      </Grid>

    {/* ------------------Box-01--------------------------------------------------- */}
    <Grid item xs={8.5} sm={6.5} lg={3.5}>
        <Box style={{ textAlign: "center"}}>
          <Stack  spacing={1} padding={0.5}>
            <Box sx={{ bgcolor: EmergencyStop ? '#1FFC04' : '#E7E7EA'}}>Emergency Stop</Box>
            <Box sx={{ bgcolor: Start ? '#1FFC04' : '#E7E7EA' }}>Start</Box>
            <Box sx={{ bgcolor: '#E7E7EA' }}>SPARE</Box>
            <Box sx={{ bgcolor: LiftHome ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Scissor Lift Home</Box>
            <Box sx={{ bgcolor: OverTravel ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Scissor Lift Over Travel</Box>
           
          </Stack>


        </Box>
      </Grid>

      {/* ------------------Box-02--------------------------------------------------- */}
      <Grid item xs={8.5} sm={6.5} lg={3.5}>
        <Box style={{ textAlign: "center"}}>
          <Stack  spacing={1} padding={0.5}>
          <Box sx={{ bgcolor: ForkArm1Home ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Fork Arm 1 home</Box>
          <Box sx={{ bgcolor: ForkArm2Home ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Fork Arm 2 home</Box>
          <Box sx={{ bgcolor: ForkArm1LH ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Fork Arm 1 LH</Box>
          <Box sx={{ bgcolor: ForkArm2LH ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Fork Arm 2 LH</Box>
          <Box sx={{ bgcolor: ForkArm1RH ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Fork Arm 1 RH</Box>
        
          </Stack>

        </Box>
      </Grid>


    {/* ------------------Box-03--------------------------------------------------- */}
    <Grid item xs={8.5} sm={6.5} lg={3.5}>
        <Box style={{ textAlign: "center"}}>
          <Stack  spacing={1} padding={0.5}>
          <Box sx={{ bgcolor: ForkArm2RH ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Fork Arm 2 RH</Box>
          <Box sx={{ bgcolor: WidthAdjusterHome ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Width Adjuster Home</Box>
          <Box sx={{ bgcolor: WidthAdjusterEnd ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Width end limit</Box>
          <Box sx={{ bgcolor: BinPresent ? '#1FFC04' : '#E7E7EA', p: 0.5 }}>Bin present</Box>
          </Stack>

        </Box>
      </Grid>
    </Grid>
  );
}
