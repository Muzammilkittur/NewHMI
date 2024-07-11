import React, { useState } from 'react';
import IconsRadio from './GroupRadio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Stack, Grid } from '@mui/material';
import AllBots from './MainPageContent/AllBots';
import MainIndLift from './MainPageContent/main_Ind_lift';
import BotStatus from './MainPageContent/BotStatus';
import BattIdentiQS from './MainPageContent/batt_identi_QS';

export default function RowRadioButtonsGroup() {
  const [selectedBot, setSelectedBot] = useState(1);

  const handleRadioBotChange = (value) => {
    setSelectedBot(value);
  };

  return (
    <Grid container>
      {/* First Grid on the left */}
      <Grid item >
        <Grid container paddingTop={1} justifyContent="flex-start">
          <FormControl>
            <Stack padding={1.5}>
              <AllBots />
            </Stack>

            <RadioGroup>
              <Grid container direction="row" spacing={1}>
                <Grid item>
                  <Stack spacing={0.5} padding={1}>
                    <FormControlLabel
                      value="Bot 1"
                      control={<IconsRadio name={'Bot'} ids={[1, 2, 3, 4]} selectedBot={selectedBot} onChange={handleRadioBotChange} />}
                    />
                    <BotStatus selectedBot={selectedBot} />
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack padding={0.5}>
                    <BattIdentiQS />
                  </Stack>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      {/* Second Grid on the right */}
      <Grid item >
        <Grid container paddingTop={1} justifyContent="flex-end">
          <Stack padding={1}>
            <MainIndLift />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
