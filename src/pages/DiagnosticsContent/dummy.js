  {/* Box-01 */}
{/* <Grid item xs={3}>
            <h1>Magnemotion Device Status</h1>
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
        





    //    Second Row: Grids 5-7 
      
      <Grid container item spacing={2}>
       
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
        </Grid>  */}
