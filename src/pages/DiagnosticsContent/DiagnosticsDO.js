
import React, { useState, useEffect } from 'react';
import { Grid, Box, Stack } from '@mui/material';
import axios from 'axios';

export default function DigitalOutputs({SPARE }) {

  // ----------------PLC Get Diagnostics Digital Output-------------------------------------------------------------------------
  const [towerLamp_Red, settowerLamp_Red]= useState(null);
  const [towerLamp_Yellow, settowerLamp_Yellow]= useState(null);
  const [towerLamp_Green, settowerLamp_Green]= useState(null);
  const [towerLamp_Blue, settowerLamp_Blue]= useState(null);
  const [towerLamp_Buzzer, settowerLamp_Buzzer]= useState(null);
  //  Module 2
  const [Machine_Start, setMachine_Start]= useState(null);
  const [Machine_Stop, setMachine_Stop]= useState(null);
  const [Machine_Reset, setMachine_Reset]= useState(null);
  
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDiagnosticsDO();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const fetchDiagnosticsDO = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/diagnostics_ditital_output', {
        headers: {
          'Accept': 'application/json'
        }
      });

      settowerLamp_Red(response.data.towerlamp_red)
      settowerLamp_Yellow(response.data.towerlamp_yellow)
      settowerLamp_Green(response.data.towerlamp_green)
      settowerLamp_Blue(response.data.towerlamp_blue)
      settowerLamp_Buzzer(response.data.towerlamp_buzzer)
      
      
      // Module 2 
      setMachine_Start(response.data.machine_start)
      setMachine_Stop(response.data.machine_stop)
      setMachine_Reset(response.data.machine_reset)
      

      

    } catch (error) {
      console.error('Error fetching tag Get values:', error);
    }
  };
// --------------------------------------------------------------------------------------------------------------------------

  return (
    <Grid container className='column' style={{ backgroundColor: '#e6fff2'}}> 
      {/* First Row: Grids 1-4 */}
      <Grid container item spacing={2} >
        {/* Box-01 */}
        <Grid item>
          <Box style={{ textAlign: "center" }}>
            <Stack spacing={1.5} padding={1}>
              Module-1 Slot-5
              <Box sx={{ bgcolor: towerLamp_Red ? 'red' : '#E7E7EA'}}>Tower Lamp Red</Box>
              <Box sx={{ bgcolor: towerLamp_Yellow ? 'yellow' : '#E7E7EA' }}>Tower Lamp Yellow</Box>
              <Box sx={{ bgcolor: towerLamp_Green ? '#1FFC04' : '#E7E7EA' }}>Tower Lamp Green</Box>
              <Box sx={{ bgcolor: towerLamp_Blue ? '#6C85F7' : '#E7E7EA' }}>Tower Lamp Blue</Box>
              <Box sx={{ bgcolor: towerLamp_Buzzer ? '#1FFC04' : '#E7E7EA' }}>Tower Lamp Buzzer</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
            </Stack>
          </Box>
        </Grid>
        {/* Box-02 */}
        <Grid item>
          <Box style={{ textAlign: "center" }}>
            <Stack spacing={1.5} padding={1}>
              Module-1 Slot-6
             <Box sx={{ bgcolor: Machine_Start ? '#1FFC04' : '#E7E7EA'}}>HMI Cycle Start Lamp</Box>
             <Box sx={{ bgcolor: Machine_Stop ? '#1FFC04' : '#E7E7EA' }}>HMI Cycle Stop Lamp</Box>
             <Box sx={{ bgcolor: Machine_Reset ? '#6C85F7' : '#E7E7EA' }}>HMI Cycle Reset Lamp</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
            </Stack>
          </Box>
        </Grid> 
      </Grid>
    </Grid>
  );
}
