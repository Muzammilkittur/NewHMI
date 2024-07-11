import React from 'react';
import { Grid, Box, Stack, TextField, InputAdornment } from '@mui/material';

export default function DiagnosticsIndLift({ind_enabled, axis1_enabled, axis2_enabled, selected_indLift, IndPosition, IndVelocity, IndPhyFault, IndGroupFault, IndServoAction, IndServoStatus, IndDCBus, IndLevel1Deg0, IndLevel1Deg90, IndLevel2Deg0, IndLevel2Deg90,
                          // axis 1
                          Axis1Position, Axis1Velocity, Axis1PhyFault, Axis1GroupFault, Axis1ServoAction, Axis1ServoStatus, Axis1DCBus, Axis1Home,
                          // axis 2
                          Axis2Position, Axis2Velocity, Axis2PhyFault, Axis2GroupFault, Axis2ServoAction, Axis2ServoStatus, Axis2DCBus, Axis2Home,

                                }) {  
  return (
    <Grid container className='App'>

    {/* ------------------Box-01--------------------------------------------------- */}
      <Grid item xs={8.5} sm={6.5} lg={3.5}>
        <Box className='column' style={{ textAlign: "center", backgroundColor: ind_enabled ? '#e6fff2' : '#fff5eb'}}>
          <div>Indexer : {selected_indLift}</div>
          <Stack  spacing={1} padding={0.5}>
            <TextField  value={IndPosition} variant="outlined" label="Position" size="small"  style={{ width: 122 }} 
                InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">deg</InputAdornment>}}
                InputLabelProps={{shrink: true}}/>

            <TextField value={IndVelocity} variant="outlined" label="Velocity" size="small"  style={{ width: 122 }} 
                InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">deg/s</InputAdornment>}}
                InputLabelProps={{shrink: true}}/>

              <Box sx={{ bgcolor: IndPhyFault ? '#FA1203' : '#1FFC04', p: 0.5 }}>Physical axis Fault</Box>
              <Box sx={{ bgcolor: IndGroupFault ? '#FA1203' : '#1FFC04', p: 0.5 }}>Group Fault</Box>
              <Box sx={{ bgcolor: IndServoAction ? '#1FFC04' : '#FA1203', p: 0.5  }}>Servo Action</Box>
              <Box sx={{ bgcolor: IndServoStatus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>Servo Enabled</Box>
              <Box sx={{ bgcolor: IndDCBus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>DC Bus Up</Box>
              <Box sx={{ bgcolor: IndLevel1Deg0 ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>Level 1, 0°</Box>
              <Box sx={{ bgcolor: IndLevel1Deg90 ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>Level 1, 90°</Box>
              <Box sx={{ bgcolor: IndLevel2Deg0 ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>Level 2, 0°</Box>
              <Box sx={{ bgcolor: IndLevel2Deg90 ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>Level 2, 90°</Box>
           
          </Stack>


        </Box>
      </Grid>

      {/* ------------------Box-02--------------------------------------------------- */}
      <Grid item xs={8.5} sm={6.5} lg={3.5}>
        <Box className='column' style={{ textAlign: "center", backgroundColor: axis1_enabled ? '#e6fff2' : '#fff5eb'}}>
        <div>Lift {selected_indLift} Axis 1</div>
      

          <Stack spacing={1} padding={0.5}>
            <TextField value={Axis1Position} variant="outlined" label="Axis-1 Position" size="small"  style={{ width: 122 }} 
                InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">mm</InputAdornment>}}
                InputLabelProps={{shrink: true}}/>

            <TextField value={Axis1Velocity} variant="outlined" label="Velocity" size="small"  style={{ width: 122 }} 
                InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
                InputLabelProps={{shrink: true}}/>
            <Box sx={{ bgcolor: Axis1PhyFault ? '#FA1203' : '#1FFC04', p: 0.5 }}>Physical axis Fault</Box>
            <Box sx={{ bgcolor: Axis1GroupFault ? '#FA1203' : '#1FFC04', p: 0.5 }}>Group Fault</Box>
            <Box sx={{ bgcolor: Axis1ServoAction ? '#1FFC04' : '#FA1203', p: 0.5  }}>Servo Action</Box>
            <Box sx={{ bgcolor: Axis1ServoStatus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>Servo Enabled</Box>
            <Box sx={{ bgcolor: Axis1DCBus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>DC Bus Up</Box>
            <Box sx={{ bgcolor: Axis1DCBus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>At Home</Box>
        
          </Stack>

        </Box>
      </Grid>


    {/* ------------------Box-03--------------------------------------------------- */}
      <Grid item xs={8.5} sm={6.5} lg={3.5}>
        <Box className='column' style={{ textAlign: "center", backgroundColor: axis2_enabled ? '#e6fff2' : '#fff5eb'}}>
        <div>Lift {selected_indLift} Axis 2</div>
        

          <Stack spacing={1} padding={0.5}>
          <TextField value={Axis2Position} variant="outlined" label="Axis-2 Position" size="small"  style={{ width: 122 }} 
                InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">mm</InputAdornment>}}
                InputLabelProps={{shrink: true}}/>

            <TextField value={Axis2Velocity} variant="outlined" label="Velocity" size="small"  style={{ width: 122 }} 
                InputProps={{readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
                InputLabelProps={{shrink: true}}/>
          <Box sx={{ bgcolor: Axis2PhyFault ? '#FA1203' : '#1FFC04', p: 0.5 }}>Physical axis Fault</Box>
          <Box sx={{ bgcolor: Axis2GroupFault ? '#FA1203' : '#1FFC04', p: 0.5 }}>Group Fault</Box>
          <Box sx={{ bgcolor: Axis2ServoAction ? '#1FFC04' : '#FA1203', p: 0.5  }}>Servo Action</Box>
          <Box sx={{ bgcolor: Axis2ServoStatus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>Servo Enabled</Box>
          <Box sx={{ bgcolor: Axis2DCBus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>DC Bus Up</Box>
          <Box sx={{ bgcolor: Axis2DCBus ? '#1FFC04' : '#E7E7EA', p: 0.5  }}>At Home</Box>
          </Stack>

        </Box>
      </Grid>
    </Grid>
  );
}
