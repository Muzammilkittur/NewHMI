import React, { useState, useEffect } from 'react';
import { Stack, Card } from '@mui/material';
import CardContent from "@mui/material/CardContent";
import MediaCard from "../../component/Card";
import axios from "axios";

const statusMap = {
  12: { label: 'Unholding', color: '#1FFC04' },
  11: { label: 'Held', color: '#1FFC04' },
  10: { label: 'Holding', color: '#1FFC04' },
  4: { label: 'Idle', color: '#1FFC04' },
  3: { label: 'Starting', color: '#1FFC04' },
  6: { label: 'Execute', color: '#1FFC04' },
  16: { label: 'Completing', color: '#1FFC04' },
  17: { label: 'Complete', color: '#FA1203' },
  15: { label: 'Resetting', color: '#FA1203' },
  14: { label: 'Unsuspending', color: '#F9F442' },
  13: { label: 'Suspend', color: '#F9F442' },
  2: { label: 'Stopped', color: '#FA1203' },
  7: { label: 'Stopping', color: '#FA1203' },
  1: { label: 'Clearing', color: '#FA1203' },
  9: { label: 'Aborted', color: '#FA1203' },
  8: { label: 'Aborting', color: '#FA1203' },
};

export default function NestedMediaCard() {
  const [packmlState, setPackmlState] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPackML();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const fetchPackML = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/diagnostics_packML', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      setPackmlState(response.data.packml_state);
    } catch (error) {
      console.error('Error fetching tag Get values:', error);
    }
  };

  return (
    <Card sx={{ boxShadow: 10, backgroundColor: "teal" }}>
      <CardContent>
        <Stack direction='row' spacing={0.5} padding={1}>
          <MediaCard discription="Unholding" customColor={packmlState === 12 ? statusMap[12].color : 'defaultColor'} />
          <MediaCard discription="Held" customColor={packmlState === 11 ? statusMap[11].color : 'defaultColor'} />
          <MediaCard discription="Holding" customColor={packmlState === 10 ? statusMap[10].color : 'defaultColor'} />
        </Stack>

        <Stack direction='row' spacing={0.5} padding={1}>
          <MediaCard discription="Idle" customColor={packmlState === 4 ? statusMap[4].color : 'defaultColor'} />
          <MediaCard discription="Starting" customColor={packmlState === 3 ? statusMap[3].color : 'defaultColor'} />
          <MediaCard discription="Execute" customColor={packmlState === 6 ? statusMap[6].color : 'defaultColor'} />
          <MediaCard discription="Completing" customColor={packmlState === 16 ? statusMap[16].color : 'defaultColor'} />
          <MediaCard discription="Complete" customColor={packmlState === 17 ? statusMap[17].color : 'defaultColor'} />          
        </Stack>

        <Stack direction='row' spacing={0.5} padding={1}>
          <MediaCard discription="Resetting" customColor={packmlState === 15 ? statusMap[15].color : 'defaultColor'} />
          <MediaCard discription="Unsuspending" customColor={packmlState === 14 ? statusMap[14].color : 'defaultColor'} />
          <MediaCard discription="Suspend" customColor={packmlState === 13 ? statusMap[13].color : 'defaultColor'} />
        </Stack>

        <Stack direction='row' spacing={0.5} padding={1}>
          <MediaCard discription="Stopped" customColor={packmlState === 2 ? statusMap[2].color : 'defaultColor'} />
          <MediaCard discription="Stopping" customColor={packmlState === 7 ? statusMap[7].color : 'defaultColor'} />
          <MediaCard discription="Clearing" customColor={packmlState === 1 ? statusMap[1].color : 'defaultColor'} />
          <MediaCard discription="Aborted" customColor={packmlState === 9 ? statusMap[9].color : 'defaultColor'} />
          <MediaCard discription="Aborting" customColor={packmlState === 8 ? statusMap[8].color : 'defaultColor'} />     
        </Stack>
      </CardContent>
    </Card>
  );
}
