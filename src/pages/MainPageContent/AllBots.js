import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Grid, TextField, Box } from '@mui/material';

export default function AllBots() {
  const [botData, setBotData] = useState({});
  const [MaxNoOfBots, setMaxNoOfBots] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMainAllbots();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMainAllbots = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/main_bot_axis', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      setBotData(response.data);
      setMaxNoOfBots(response.data.maxNoOfBots);
    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };




  const getStatusDetails = (status) => {
    switch (status) {
      case 1:
        return { text: 'Idle', color: '#DCDEDA' };
      case 2:
        return { text: 'Moving to Retrieve', color: '#1FFC04' };
      case 3:
        return { text: 'Retrieving Bin', color: '#049AFC' };
      case 4:
        return { text: 'Moving to Storing', color: '#1FFC04' };
      case 5:
        return { text: 'Storing Bin', color: '#049AFC' };
      case 6:
        return { text: 'Obstacle Clearing', color: '#F9F442' };
      case 7:
        return { text: 'Idenfication Move', color: '#1FFC04' };
      case 8:
        return { text: 'Scanning', color: '#049AFC' };
      case 9:
        return { text: 'Moving to charge', color: '#1FFC04' };
      case 10:
        return { text: 'Charging', color: '#049AFC' };
      default:
        return { text: 'Unknown', color: '#808080' };
    }
  };


  return (
    <Grid container direction="row" spacing={1}>
      {[...Array(MaxNoOfBots)].map((_, index) => {
        const i = index + 1;
        const statusDetails = getStatusDetails(botData[`task_status_${i}`]);
        return (
          <Grid item key={index}>
            <Box className="column" style={{ textAlign: "center", backgroundColor: '#fff5eb' }}>
            <Box paddingTop={0.5}>Mover Data {i}</Box>
              <Stack direction="row" paddingTop={2} spacing={0.5}>
                <TextField size="small" value={`${i}`} label='Bot No' style={{ width: 70 }}
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
                <TextField size="small" label="Path ID" value={botData[`mover_ID_${i}`] || '0'} style={{ width: 70 }}
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
              </Stack>

              <Stack direction="row" paddingTop={2} spacing={0.5}>
          
                <Box paddingTop={0.5}>From</Box>
                <TextField size="small" label="X" value={botData[`retrieve_station_number_${i}`] || '0'} style={{ width: 45 }}							 
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
                <TextField size="small" label="Y" value={botData[`retrieve_fork_direction_${i}`] || '0'} style={{ width: 45 }}																  
						    	InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
                <TextField size="small" label="Z" value={botData[`retrieve_bot_z_level_${i}`] || '0'} style={{ width: 45 }}
								  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
                <TextField size="small" label="Z Position" value={botData[`retrieve_bot_z_position_${i}`] || '0'} style={{ width: 70 }}
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
              </Stack>

              <Stack direction="row" paddingTop={2} spacing={0.5}>
              <Box paddingTop={0.5} paddingRight={2.2}>To</Box>
                <TextField size="small" label="X" value={botData[`storage_station_number_${i}`] || '0'} style={{ width: 45 }}							 
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
                <TextField size="small" label="Y" value={botData[`storage_fork_direction_${i}`] || '0'} style={{ width: 45 }}																  
						    	InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
                <TextField size="small" label="Z" value={botData[`storage_bot_z_level_${i}`] || '0'} style={{ width: 45 }}
								  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
                <TextField size="small" label="Z Position" value={botData[`storage_bot_z_position_${i}`] || '0'} style={{ width: 70 }}
                  InputProps={{ readOnly: true, sx: { backgroundColor: '#f0f0f0', height: '30px' } }} />
              </Stack>

              <Stack padding={1} spacing={0.5}>
                 <Box sx={{ bgcolor: statusDetails.color, p: 0.5 }} borderRadius={1} maxWidth={150} minWidth={150}>
                  {statusDetails.text}
                </Box>
              </Stack>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
