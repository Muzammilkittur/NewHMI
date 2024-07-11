import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import IconsRadio from './GroupRadio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Stack, Grid, Button } from '@mui/material';
import FloatingActionButtonZoom from './manualcontent/X_axispage_B1';
import ManualindLift from './manualcontent/Indexer_lift';
import AlertDialog from '../component/DialogButton';
import ManualQS from './manualcontent/manual_QS';
import NestedMediaCard from './manualcontent/ManualPackML';

export default function RowRadioButtonsGroup() {
  const [SelectedBot, setSelectedBot] = useState(1);
  const [SelectedAxis, setSelectedAxis] = useState("X");
  const [ids, setIds] = useState([1, 2, 3, 4]);
  const [Selected_indLift, setSelected_indLift] = useState(1);

  const [Indlift_Data, setIndlift_Data] = useState({});
  const [botData, setBotData] = useState({});

  const intervalRef = useRef(null);

  const fetchindLift = useCallback(async (number) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/manual_indLift', {
        params: { number: number }
      });

      const indexerData = response.data.indexer;
      const liftData = response.data.lift;

      setIndlift_Data({
        ...indexerData,
        IndJogVel: indexerData.manual.Jog_speed,
        IndJogAcc: indexerData.manual.Jog_acc,
        IndJogDec: indexerData.manual.Jog_dec,
        IndHomeVel: indexerData.manual.Home_speed,
        IndHomeAcc: indexerData.manual.Home_acc,
        IndHomeDec: indexerData.manual.Home_dec,
        IndMoveVel: indexerData.manual.Move_speed,
        IndMoveAcc: indexerData.manual.Move_acc,
        IndMoveDec: indexerData.manual.Move_dec,
        IndMovPos: indexerData.manual.Move_pos,

        ...liftData,
        LiftJogVel: liftData.manual.Jog_speed,
        LiftJogAcc: liftData.manual.Jog_acc,
        LiftJogDec: liftData.manual.Jog_dec,
        LiftHomeVel: liftData.manual.Home_speed,
        LiftHomeAcc: liftData.manual.Home_acc,
        LiftHomeDec: liftData.manual.Home_dec,
        LiftMoveVel: liftData.manual.Move_speed,
        LiftMoveAcc: liftData.manual.Move_acc,
        LiftMoveDec: liftData.manual.Move_dec,
        LiftMovPos: liftData.manual.Move_pos,
      });
    } catch (error) {
      console.error('Error fetching the lift data', error);
    }
  }, []);

  const fetchBotaxis = useCallback(async (bot, axis) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/manual_bot_axis', {
        params: { bot: bot, axis: axis }
      });
      const {
        enabledstatus, actualBot_velocity, actualBot_position, actualBot_current, actualBot_torque, botfault, bothomestatus,
        maxtorq, targPos, jogvel, jogacc, jogdec, homevel, homeacc, homedec, movevel, moveacc, movedec,
      } = response.data;

      setBotData({
        enabledstatus, actualBot_velocity, actualBot_position, actualBot_current, actualBot_torque, botfault, bothomestatus,
        maxtorq, targPos, jogvel, jogacc, jogdec, homevel, homeacc, homedec, movevel, moveacc, movedec,
      });
    } catch (error) {
      console.error('Error fetching the bot data', error);
    }
  }, []);

  useEffect(() => {
    fetchindLift(Selected_indLift);
    fetchBotaxis(SelectedBot, SelectedAxis);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      fetchindLift(Selected_indLift);
      fetchBotaxis(SelectedBot, SelectedAxis);
    }, 500); 

    return () => clearInterval(intervalRef.current); // cleanup on component unmount
  }, [Selected_indLift, SelectedBot, SelectedAxis, fetchindLift, fetchBotaxis]);

  const handleRadioBotChange = (value) => {
    setSelectedBot(value);
  };

  const handleRadioAxisChange = (value) => {
    setSelectedAxis(value);
  };

  const handleIndLiftRadioChange = (value) => {
    setSelected_indLift(value);
  };

  const handleAddBot = () => {
    const nextId = ids[ids.length - 1] + 1;
    setIds([...ids, nextId]);
  };

  const handleRemoveBot = () => {
    if (ids.length > 1) {
      setIds(ids.slice(0, -1));
    }
  };

  return (
    <Grid container justifyContent="center"> 
      {/* First Grid */}
      <Grid item xs={6}> 
        <FormControl>
          <Stack direction='row' padding={0.5} spacing={1}>
            <Button variant="contained" onClick={handleAddBot}>Add Bot</Button>
            <Button variant="contained" onClick={handleRemoveBot}>Remove Bot</Button>
          </Stack>
          <RadioGroup>
            <Stack spacing={2.5} padding={1}>
              <FormControlLabel value="Bot 1" control={<IconsRadio name={'Bot'} ids={ids} SelectedBot={SelectedBot} onChange={handleRadioBotChange} />} />
            </Stack>
          </RadioGroup>

          <RadioGroup>
            <Stack spacing={2.5} padding={1}>
              <FormControlLabel value="axis" control={<IconsRadio ids={['X', 'Y1', 'Y2', 'Z']} name={'Axis'} SelectedAxis={SelectedAxis} onChange={handleRadioAxisChange} />} />
            </Stack>
          </RadioGroup>
         
          <Stack padding={1.5}>
            <FloatingActionButtonZoom botData={botData} SelectedBot={SelectedBot} SelectedAxis={SelectedAxis} />
          </Stack>
          
          <Stack padding={1} spacing={1} direction='row'>
            <AlertDialog buttonName="Quick Stick" Title='Quick Stick' contentComponent={ManualQS} />
            <AlertDialog buttonName="PackML" Title='PackML' contentComponent={NestedMediaCard} />
          </Stack>
        </FormControl>
      </Grid>
  
      {/* Second Grid */}
      <Grid item xs={6}>
        <Grid container paddingTop={1} justifyContent="center">
          <Stack spacing={1} padding={1} paddingTop={0}>
            <FormControlLabel value="IndLift" control={<IconsRadio name={'Ind-Lift'} ids={[1, 2]} SelectedBot={Selected_indLift} onChange={handleIndLiftRadioChange} />} />
          </Stack>
          <ManualindLift Indlift_Data={Indlift_Data} SelectedBot={Selected_indLift} />
        </Grid>
      </Grid>
    </Grid>
  );
}
