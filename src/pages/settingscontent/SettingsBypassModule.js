import React, { useState, useEffect } from 'react';
import { Stack, Card, Typography, Button } from '@mui/material';
import CardContent from "@mui/material/CardContent";
import MediaCard from "../../component/Card";
import axios from "axios";


const cardTexts = [
  'PLC Integration', 'Magnemotion cmd', '1 Lift-Indexer', '2 Lift-Indexer', 'None',
  'None', 'None', 'None', 'None', 'Bot Management', 'Bot 1 Axis cmd', 'Bot 2 Axis cmd',
  'Bot 3 Axis cmd', 'Bot 4 Axis cmd', 'None', 'None', 'None', 'None', 'None', 'None',
  'Bot 1 Axis cmd', 'Bot 2 Axis cmd', 'Bot 3 Axis cmd', 'Bot 4 Axis cmd', 'None', 'None',
  'None', 'None', 'None', 'None', 'None', 'None',
];

export default function Equipment_Module() {
  const [PackML_Bypass, setPackML_Bypass] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchSettingsBypass();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const fetchSettingsBypass = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/settingsBypassModule', {
        headers: {
          'Accept': 'application/json'
        }
      });

      setPackML_Bypass(response.data);
    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };

  const handleButtonClick = async (tagNumber) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/updateBypassModule', {
        tag_number: parseInt(tagNumber)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Update response:', response.data);
      // Optionally refresh the data after update
      fetchSettingsBypass();
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  return (
    <Card sx={{ boxShadow: 10, backgroundColor: "teal" }}>
      <CardContent>
        <Stack direction='row' spacing={0.5} padding={1} sx={{ flexWrap: 'wrap', width: '100%', height: '100%' }}>
          {PackML_Bypass.map((tag, index) => (
            <Stack key={tag.tag_number} alignItems="center" sx={{ width: '12%', height: '20%' }}>
              <Button onClick={() => handleButtonClick(tag.tag_number)}>
                <MediaCard
                  title={`EM${tag.tag_number}`}
                  customColor={tag.customColor}
                  discription={tag.description}
                />
                <Typography>{''}</Typography>
              </Button>
              <Typography variant="body1" color="white" textAlign='center' sx={{ fontSize: '10px' }}>
                {cardTexts[index]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
