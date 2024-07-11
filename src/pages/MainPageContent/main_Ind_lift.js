import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Grid, TextField, Box, InputAdornment } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';

export default function AllBots() {
  const [botData, setBotData] = useState({});
 

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMainIndLift();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMainIndLift = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/main_ind_lift', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      setBotData(response.data);
    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };

  const renderStatusIcon = (fault) => {
    return fault ? <CheckCircleIcon style={{ color: 'green' }} /> : <ErrorIcon style={{ color: 'red' }} />;
  };

  const renderHomePositionIcon = (condition) => {
    return condition ? <OtherHousesIcon style={{ color: 'green' }} /> : <OtherHousesIcon style={{ color: 'gray' }} />;
  };

  return (
    <Grid container direction="row" spacing={1}>
      {[...Array(2)].map((_, index) => {
        const i = index + 1;
        const liftIndexerPrefix = `EM0${i+1}_Lift_Indexer_HMI`;
        const actualPositionKey = `XY1${i*2}1_Indexer.ActualPosition`;
        const atHomePosKey = `I_${i === 1 ? 'LHS' : 'RHS'}_Lift_at_home_pos`;
        const downEndLimitKey = `I_${i === 1 ? 'LHS' : 'RHS'}_Lift_down_end_limit`;
        const upEndLimitKey = `I_${i === 1 ? 'LHS' : 'RHS'}_Lift_up_end_limit`;
  

        return (
          <Grid item key={index}>
            <Box className="column" style={{ textAlign: "center", backgroundColor: botData[`${liftIndexerPrefix}.Indexer_enable`] ? '#e6fff2' : '#fff5eb'}}>
              <Box paddingTop={0.5}>Indexer {i}</Box>
              <Stack direction="column" paddingTop={1} spacing={0.5}>
                <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                  {renderStatusIcon(botData[`${liftIndexerPrefix}.Indexer_fault`] === false)}
                </Box>
                <TextField value={botData[actualPositionKey] ?? ''} variant="outlined" label="Position" size="small" style={{ width: 122 }} 
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }, endAdornment: <InputAdornment position="end">mm</InputAdornment> }}
                  InputLabelProps={{ shrink: true }}/>
                <Box sx={{ bgcolor: botData[`${liftIndexerPrefix}.Indexer_enable`] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>
                  Enabled
                </Box>
                <Box sx={{ bgcolor: botData[`${liftIndexerPrefix}.Indexer_at_level_1_deg_0`] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>
                  Level 1, 0°
                </Box>
                <Box sx={{ bgcolor: botData[`${liftIndexerPrefix}.Indexer_at_level_1_deg_90`] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>
                  Level 1, 90°
                </Box>
                <Box sx={{ bgcolor: botData[`${liftIndexerPrefix}.Indexer_at_level_2_deg_0`] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>
                  Level 2, 0°
                </Box>
                <Box sx={{ bgcolor: botData[`${liftIndexerPrefix}.Indexer_at_level_2_deg_90`] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>
                  Level 2, 90°
                </Box>
              </Stack>
            </Box>
            <Box className="column" style={{ textAlign: "center", backgroundColor: botData[`${liftIndexerPrefix}.Lift_axis_1_enable`] && botData[`${liftIndexerPrefix}.Lift_axis_2_enable`] ? '#e6fff2' : '#fff5eb'}}>
              <Box paddingTop={0.5}>Lift {i}</Box>
              <Stack direction='row' padding={0.5} spacing={1.5}>
                  {renderStatusIcon(botData[`${liftIndexerPrefix}.Lift_axis_1_fault`] === false)}   
                  {renderHomePositionIcon(botData[atHomePosKey])}
                  {renderStatusIcon(botData[`${liftIndexerPrefix}.Lift_axis_2_fault`] === false)}   
              </Stack>

              <Stack direction="column" paddingTop={2} spacing={0.5}>
                <TextField value={botData[`XY1${i*2}1_Z${i}.ActualPosition`] ?? ''} variant="outlined" label="Axis-1 Position" size="small" style={{ width: 122 }} 
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }, endAdornment: <InputAdornment position="end">mm</InputAdornment> }}
                  InputLabelProps={{ shrink: true }}/>
                <TextField value={botData[`XY1${i*2}1_Z${i}.ActualPosition`] ?? ''} variant="outlined" label="Axis-2 Position" size="small" style={{ width: 122 }} 
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' }, endAdornment: <InputAdornment position="end">mm</InputAdornment> }}
                  InputLabelProps={{ shrink: true }}/>

                <Box sx={{ bgcolor: botData[`${liftIndexerPrefix}.Lift_axis_1_enable`] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>Axis 1 Enabled</Box>
                <Box sx={{ bgcolor: botData[`${liftIndexerPrefix}.Lift_axis_2_enable`] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>Axis 2 Enabled</Box>
                <Box sx={{ bgcolor: botData[downEndLimitKey] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>Down End Limit</Box>
                <Box sx={{ bgcolor: botData[upEndLimitKey] ? '#1FFC04' : '#E7E7EA', p: 0.5 }} borderRadius={1}>Up End Limit</Box>
              </Stack>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
