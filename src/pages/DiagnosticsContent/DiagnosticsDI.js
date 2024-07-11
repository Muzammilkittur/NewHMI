
import React, { useState, useEffect } from 'react';
import { Grid, Box, Stack } from '@mui/material';
import axios from 'axios';

export default function DigitalInputs({ SPARE }) {

  // ----------------PLC Get Diagnostics Digital Input-------------------------------------------------------------------------
  const [m1_LiftControl_On, setm1_LiftControl_On]= useState(null);
  const [m1_QScontrol_On, setm1_QScontrol_On]= useState(null);
  const [m1_LiftHomePos, setm1_LiftHomePos]= useState(null);
  const [m1_LiftDownPos, setm1_LiftDownPos]= useState(null);
  const [m1_LiftUpPos, setm1_LiftUpPos]= useState(null);
  const [m1_EnterySide_Level1, setm1_EnterySide_Level1]= useState(null);
  const [m1_Lift_Level1, setm1_Lift_Level1]= useState(null);
  const [m1_Lift_Level2, setm1_Lift_Level2]= useState(null);
  const [m1_Index_Entery, setm1_Index_Entery]= useState(null);
  const [m1_Index_Exit, setm1_Index_Exit]= useState(null);
  const [m1_Auto, setm1_Auto]= useState(null);
  const [m1_Manual, setm1_Manual]= useState(null);
  const [m1_Start, setm1_Start]= useState(null);
  const [m1_Stop, setm1_Stop]= useState(null);
  const [m1_Reset, setm1_Reset]= useState(null);
  const [m1_Emergency_Reset, setm1_Emergency_Reset]= useState(null);
  const [m1_Emergency_Stop, setm1_Emergency_Stop]= useState(null);
  const [m1_Emergency_Stop1, setm1_Emergency_Stop1]= useState(null);
  const [m1_Emergency_Stop2, setm1_Emergency_Stop2]= useState(null);
  const [m1_Emergency_Stop3, setm1_Emergency_Stop3]= useState(null);
  const [m1_Emergency_Stop4, setm1_Emergency_Stop4]= useState(null);
  //  Module 2
  const [m2_LiftControl_On, setm2_LiftControl_On]= useState(null);
  const [m2_QScontrol_On, setm2_QScontrol_On]= useState(null);
  const [m2_LiftHomePos, setm2_LiftHomePos]= useState(null);
  const [m2_LiftDownPos, setm2_LiftDownPos]= useState(null);
  const [m2_LiftUpPos, setm2_LiftUpPos]= useState(null);
  const [m2_Lift_Level1, setm2_Lift_Level1]= useState(null);
  const [m2_Lift_Level2, setm2_Lift_Level2]= useState(null);
  const [m2_Index_Entery, setm2_Index_Entery]= useState(null);
  const [m2_Index_Exit, setm2_Index_Exit]= useState(null);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchManualQS();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const fetchManualQS = async (number) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/diagnostics_ditital_input', {
        headers: {
          'Accept': 'application/json'
        }
      });

      setm1_LiftControl_On(response.data.m1_liftcontrol_on)
      setm1_QScontrol_On(response.data.m1_qscontrol_on)
      setm1_LiftHomePos(response.data.m1_lifthomepos)
      setm1_LiftDownPos(response.data.m1_liftdownpos)
      setm1_LiftUpPos(response.data.m1_liftuppos)
      setm1_EnterySide_Level1(response.data.m1_enteryside_level1)
      setm1_Lift_Level1(response.data.m1_lift_level1)
      setm1_Lift_Level2(response.data.m1_lift_level2)
      setm1_Index_Entery(response.data.m1_index_entery)
      setm1_Index_Exit(response.data.m1_index_exit)
      setm1_Auto(response.data.m1_auto)
      setm1_Manual(response.data.m1_manual)
      setm1_Start(response.data.m1_start)
      setm1_Stop(response.data.m1_stop)
      setm1_Reset(response.data.m1_reset)
      setm1_Emergency_Reset(response.data.m1_reset)
      setm1_Emergency_Stop(response.data.m1_emergency_stop)
      setm1_Emergency_Stop1(response.data.m1_emergency_stop1)
      setm1_Emergency_Stop2(response.data.m1_emergency_stop2)
      setm1_Emergency_Stop3(response.data.m1_emergency_stop3)
      setm1_Emergency_Stop4(response.data.m1_emergency_stop4)
      // Module 2 
      setm2_LiftControl_On(response.data.m2_liftcontrol_on)
      setm2_QScontrol_On(response.data.m2_qscontrol_on)
      setm2_LiftHomePos(response.data.m2_lifthomepos)
      setm2_LiftDownPos(response.data.m2_liftdownpos)
      setm2_LiftUpPos(response.data.m2_liftuppos)
      setm2_Lift_Level1(response.data.m2_lift_level1)
      setm2_Lift_Level2(response.data.m2_lift_level2)
      setm2_Index_Entery(response.data.m2_index_entery)
      setm2_Index_Exit(response.data.m2_index_exit)

      

    } catch (error) {
      console.error('Error fetching tag Get values:', error);
    }
  };
// --------------------------------------------------------------------------------------------------------------------------


  return (
    <Grid container className='column'style={{ backgroundColor: '#e6fff2'}}> 
      {/* First Row: Grids 1-4 */}
      <Grid container item spacing={2} >
        {/* Box-01 */}
        
            <Grid item xs={3}>
              <Box style={{ textAlign: "center" }}>
                <Stack spacing={1} padding={0.5}>
                  Module-1 Slot-1
                  <Box sx={{ bgcolor: m1_LiftControl_On ? '#1FFC04' : '#E7E7EA'}}>Lift Control ON</Box>
                  <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                  <Box sx={{ bgcolor: m1_QScontrol_On ? '#1FFC04' : '#E7E7EA' }}>QS Control ON</Box>
                  <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                  <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                  <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                  <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                  <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                </Stack>
              </Box>
            </Grid>
            {/* Box-02 */}
            <Grid item xs={3}>
              <Box style={{ textAlign: "center" }}>
                <Stack spacing={1} padding={0.5}>
                Module-1 Slot-2
                <Box sx={{ bgcolor: m1_LiftHomePos ? '#1FFC04' : '#E7E7EA'}}>Lift Home Position</Box>
                <Box sx={{ bgcolor: m1_LiftDownPos ? '#1FFC04' : '#E7E7EA' }}>Lift Down Position</Box>
                <Box sx={{ bgcolor: m1_LiftUpPos ? '#1FFC04' : '#E7E7EA' }}>Lift Up Position</Box>
                <Box sx={{ bgcolor: m1_EnterySide_Level1 ? '#1FFC04' : '#E7E7EA' }}>EnterySideLevel_1</Box>
                <Box sx={{ bgcolor: m1_Lift_Level1 ? '#1FFC04' : '#E7E7EA' }}>Lift at Level_1</Box>
                <Box sx={{ bgcolor: m1_Lift_Level2 ? '#1FFC04' : '#E7E7EA' }}>Lift at Level_2</Box>
                <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                </Stack>
              </Box>
            </Grid>
            {/* Box-03 */}
            <Grid item xs={3}>
              <Box style={{ textAlign: "center" }}>
                <Stack spacing={1} padding={0.5}>
                Module-1 Slot-3
                <Box sx={{ bgcolor: m1_Index_Entery ? '#1FFC04' : '#E7E7EA'}}>Indexer Entery</Box>
                <Box sx={{ bgcolor: m1_Index_Exit ? '#1FFC04' : '#E7E7EA' }}>Indexer Exit</Box>
                <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                <Box sx={{ bgcolor: m1_Auto ? '#1FFC04' : '#E7E7EA' }}>HMI Auto Mode</Box>
                <Box sx={{ bgcolor: m1_Manual ? '#1FFC04' : '#E7E7EA' }}>HMI Manual Mode</Box>
                <Box sx={{ bgcolor: m1_Start ? '#1FFC04' : '#E7E7EA' }}>HMI Cycle Start</Box>
                <Box sx={{ bgcolor: m1_Stop ? '#1FFC04' : '#E7E7EA' }}>HMI Cycle Stop</Box>
                </Stack>
              </Box>
            </Grid>
            {/* Box-04 */}
            <Grid item xs={3}>
              <Box style={{ textAlign: "center" }}>
                <Stack spacing={1} padding={0.5}>
                Module-1 Slot-4
                <Box sx={{ bgcolor: m1_Reset ? '#1FFC04' : '#E7E7EA'}}>HMI Cycle Reset</Box>
                <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
                <Box sx={{ bgcolor: m1_Emergency_Reset ? '#1FFC04' : '#E7E7EA' }}>HMI Emergency Reset</Box>
                <Box sx={{ bgcolor: m1_Emergency_Stop ? '#1FFC04' : '#E7E7EA' }}>HMI Emergency Stop</Box>
                <Box sx={{ bgcolor: m1_Emergency_Stop1 ? '#1FFC04' : '#E7E7EA' }}>Line Emergency Stop 1</Box>
                <Box sx={{ bgcolor: m1_Emergency_Stop2 ? '#1FFC04' : '#E7E7EA' }}>Line Emergency Stop 2</Box>
                <Box sx={{ bgcolor: m1_Emergency_Stop3 ? '#1FFC04' : '#E7E7EA' }}>Line Emergency Stop 3</Box>
                <Box sx={{ bgcolor: m1_Emergency_Stop4 ? '#1FFC04' : '#E7E7EA' }}>Line Emergency Stop 4</Box>
                </Stack>
              </Box>
            </Grid>
      </Grid>
        





      {/* Second Row: Grids 5-7 */}
      <Grid container item spacing={2}>
        {/* Box-05 */}
        <Grid item xs={4}>
          <Box style={{ textAlign: "center" }}>
            <Stack spacing={1} padding={0.5}>
            Module-1 Slot-5
              <Box sx={{ bgcolor: m2_LiftControl_On ? '#1FFC04' : '#E7E7EA'}}>Lift Control ON</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
              <Box sx={{ bgcolor: m2_QScontrol_On ? '#1FFC04' : '#E7E7EA' }}>QS Control ON</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
              <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
            </Stack>
          </Box>
        </Grid>
        {/* Box-06 */}
        <Grid item xs={4}>
          <Box style={{ textAlign: "center" }}>
            <Stack spacing={1} padding={0.5}>
            Module-2 Slot-6
             <Box sx={{ bgcolor: m2_LiftHomePos ? '#1FFC04' : '#E7E7EA'}}>Lift Home Position</Box>
             <Box sx={{ bgcolor: m2_LiftDownPos ? '#1FFC04' : '#E7E7EA' }}>Lift Down Position</Box>
             <Box sx={{ bgcolor: m2_LiftUpPos ? '#1FFC04' : '#E7E7EA' }}>Lift Up Position</Box>
             <Box sx={{ bgcolor: m2_Lift_Level1 ? '#1FFC04' : '#E7E7EA' }}>Lift at Level_1</Box>
             <Box sx={{ bgcolor: m2_Lift_Level2 ? '#1FFC04' : '#E7E7EA' }}>Lift at Level_2</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
            </Stack>
          </Box>
        </Grid>
        {/* Box-07 */}
        <Grid item xs={4}>
          <Box style={{ textAlign: "center" }}>
            <Stack spacing={1} padding={0.5}>
            Module-2 Slot-7
             <Box sx={{ bgcolor: m2_Index_Entery ? '#1FFC04' : '#E7E7EA'}}>Indexer Entery</Box>
             <Box sx={{ bgcolor: m2_Index_Exit ? '#1FFC04' : '#E7E7EA' }}>Indexer Exit</Box>
             <Box sx={{ bgcolor: SPARE ? '#1FFC04' : '#E7E7EA' }}>SPARE</Box>
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
