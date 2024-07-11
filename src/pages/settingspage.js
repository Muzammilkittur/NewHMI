import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Grid, Stack, FormControl, RadioGroup, FormControlLabel } from '@mui/material';
import IconsRadio from './GroupRadio';
import SettingsAxisPage from './settingscontent/Settings_axispage';
import SettingsIndLift from './settingscontent/SettingsInd_lift';
import AlertDialog from '../component/DialogButton';
import SettingsBypass_Module from './settingscontent/SettingsBypassModule';
import SafeTravelPosition from './settingscontent/Settings_STP';
import Settings_QS from './settingscontent/Settings_QS';


const initialState = {
  indLift: {
    Indexer_Settings: {
      Move_speed: '',
      Move_acc: '',
      Move_dec: '',
    },
    Lift_Settings: {
      Jog_speed: '',
      Jog_acc: '',
      Jog_dec: '',
      Home_speed: '',
      Home_acc: '',
      Home_dec: '',
      Move_speed: '',
      Move_acc: '',
      Move_dec: '',
      Move_pos: '',
    },
    Indexer_Manual: {
      Jog_speed: '',
      Jog_acc: '',
      Jog_dec: '',
      Home_speed: '',
      Home_acc: '',
      Home_dec: '',
      Move_speed: '',
      Move_acc: '',
      Move_dec: '',
      Move_pos: '',
    },
  },
  botAxis: {
    X_axis: {
      actual_pos: '',
      actual_velocity: '',
      actual_current: '',
      actual_torque: '',
      Settings: {
        move_speed: '',
        move_acc: '',
        move_dec: '',
        max_torque: '',
      },
      Status: {
        Motor_Enabled: '',
      },
    },
    Z_axis: {
      actual_pos: '',
      actual_velocity: '',
      actual_current: '',
      actual_torque: '',
      Settings: {
        move_speed: '',
        move_acc: '',
        move_dec: '',
        max_torque: '',
      },
      Status: {
        Motor_Enabled: '',
      },
    },
    Y_axis: {
      Settings: {
        move_speed: '',
        move_acc: '',
        move_dec: '',
      },
      Double_deep_left_pos: '',
      Double_deep_right_pos: '',
    },
    Y_axis_1: {
      Status: {
        Motor_Enabled: '',
      },
      at_home_pos: '',
      Fault: '',
      actual_pos: '',
      actual_velocity: '',
      actual_current: '',
      actual_torque: '',
      Settings: {
        max_torque: '',
      },
    },
    Y_axis_2: {
      Status: {
        Motor_Enabled: '',
      },
      at_home_pos: '',
      Fault: '',
      actual_pos: '',
      actual_velocity: '',
      actual_current: '',
      actual_torque: '',
      Settings: {
        max_torque: '',
      },
    },
  },
};

const SettingsPage = () => {
  const [selectedBot, setSelectedBot] = useState(1);
  const [selectedIndLift, setSelectedIndLift] = useState(1);
  const [state, setState] = useState(initialState);
  const intervalRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      // Fetch data for settings_indLift endpoint
      const responseIndLift = await axios.get('http://127.0.0.1:8000/settings_indLift', {
        params: { number: selectedIndLift },
        headers: { 'Accept': 'application/json' },
      });

      // Fetch data for settings_bot_axis endpoint
      const responseBotAxis = await axios.get('http://127.0.0.1:8000/settings_bot_axis', {
        params: { bot: selectedBot },
        headers: { 'Accept': 'application/json' },
      });

      setState(prevState => ({
        ...prevState,
        indLift: {
          ...prevState.indLift,
          ...responseIndLift.data,
        },
        botAxis: responseBotAxis.data,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedIndLift, selectedBot]);

  useEffect(() => {
    fetchData();

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      fetchData();
    }, 500); // 500ms interval

    return () => clearInterval(intervalRef.current); // cleanup on component unmount
  }, [selectedIndLift, selectedBot, fetchData]);


  const handleRadioBotChange = value => setSelectedBot(value);
  const handleIndLiftRadioChange = value => setSelectedIndLift(value);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <FormControl>
          <RadioGroup>
            <Stack spacing={2.5} padding={1}>
              <FormControlLabel
                value="Bot 1"
                control={<IconsRadio name={'Bot'} ids={[1, 2, 3, 4]} selectedBot={selectedBot} onChange={handleRadioBotChange} />}
              />
            </Stack>
          </RadioGroup>
          <Stack padding={0.5}>
            <SettingsAxisPage
              botAxis={state.botAxis}
              selectedBot={selectedBot}
            />
          </Stack>
        </FormControl>
      </Grid>



      <Grid item xs={6}>
        <Grid container paddingTop={1} justifyContent="center">
          <Stack spacing={1} padding={0.5} paddingTop={0}>
            <FormControlLabel
              value="IndLift"
              control={<IconsRadio name={'Ind-Lift'} ids={[1, 2]} selectedIndLift={selectedIndLift} onChange={handleIndLiftRadioChange} />}
            />
          </Stack>
          <SettingsIndLift
            indLift={state.indLift}
            selectedIndLift={selectedIndLift}
          />
          <Stack padding={1} spacing={1} direction='row'>
            <AlertDialog buttonName="Bypass Module" Title='Bypass Module' contentComponent={SettingsBypass_Module} />
            <AlertDialog buttonName="Safe Travel" Title='Safe Travel Position' contentComponent={SafeTravelPosition} />
            <AlertDialog buttonName="Quick Stick" Title='Quick Stick' contentComponent={Settings_QS} />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
