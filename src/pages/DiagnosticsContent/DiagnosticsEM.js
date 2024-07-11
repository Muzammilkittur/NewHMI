import React, { useState, useEffect } from 'react';
import { Stack, Card, Typography} from '@mui/material';
import CardContent from "@mui/material/CardContent";
import MediaCard from "../../component/Card";
import axios from "axios";

const statusMap = {
  0: { label: 'Bypassed', color: '#DCDEDA' }, //Gray
  1: { label: 'Clearing', color: '#FA1203' }, //Red
  2: { label: 'Stopped', color: '#FA1203' },  
  3: { label: 'Starting', color: '#1FFC04' }, //Green
  4: { label: 'Idle', color: '#1FFC04' },
  // 5: is Not used.
  6: { label: 'Execute', color: '#1FFC04' },
  7: { label: 'Stopping', color: '#FA1203'},
  8: { label: 'Aborting', color: '#FA1203'},
  9: { label: 'Aborted', color: '#FA1203'},
  10: { label: 'Holding', color: '#6C85F7'}, //Blue
  11: { label: 'Held', color: '#6C85F7'},
  12: { label: 'Unholding', color: '#6C85F7'},
  13: { label: 'Suspended', color: '#EBF20D'}, //Yellow
  14: { label: 'Unsuspending', color: '#EBF20D'},
  15: { label: 'Resetting', color: '#FA1203'},
  16: { label: 'Completing', color: '#1FFC04'},
  17: { label: 'Complete', color: '#FA1203'}
};


const cardTexts = ['PLC Integration', 'Magnemotion cmd', '1 Lift-Indexer', '2 Lift-Indexer', 'None',
                  'None', 'None', 'None', 'None', 'Bot Managment', 'Bot 1 Axis cmd', 'Bot 2 Axis cmd',
                  'Bot 3 Axis cmd', 'Bot 4 Axis cmd', 'None', 'None', 'None', 'None', 'None', 'None', 
                  'Bot 1 Axis cmd', 'Bot 2 Axis cmd', 'Bot 3 Axis cmd', 'Bot 4 Axis cmd',  'None', 'None',
                  'None', 'None', 'None', 'None', 'None', 'None',];

export default function Equipment_Module() {
  const [emStates, setEmStates] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDiagnosticEM();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const fetchDiagnosticEM = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/diagnosticEM', {
        headers: {
          'Accept': 'application/json'
        }
      });

      setEmStates(response.data);
    } catch (error) {
      console.error('Error fetching tag Get values:', error);
    }
  };

  return (
    <Card sx={{ boxShadow: 10, backgroundColor: "teal" }}>
      <CardContent>
        <Stack direction='row' spacing={0.5} padding={1} sx={{ flexWrap: 'wrap' }}>
        {Object.keys(emStates).map((key, index) => (
            <Typography key={key} variant="h" color="white" fontSize={12} textAlign='center'>
              <MediaCard
                title={key}
                customColor={statusMap[emStates[key]]?.color}
                discription={statusMap[emStates[key]]?.label || "None"} // Assuming this should be description
              />
              {cardTexts[index]}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
    
  );
}
