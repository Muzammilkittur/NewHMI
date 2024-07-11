import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Orders() {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAlarms();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const fetchAlarms = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/alarms', {
        headers: {
          'Accept': 'application/json'
        }
      });

      const alarmData = response.data.map((alarm, index) => ({
        id: index,
        date: alarm.timestamp,
        name: alarm.name,
      }));

      setAlarms(alarmData);

    } catch (error) {
      console.error('Error fetching alarms:', error);
    }
  };

  const handleClear = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/clear_logs');
      setAlarms([]);
    } catch (error) {
      console.error('Error clearing logs:', error);
    }
  };

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alarms.map((alarm) => (
            <TableRow key={alarm.id}>
              <TableCell>{alarm.date}</TableCell>
              <TableCell>{alarm.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Button
          variant="contained"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </React.Fragment>
  );
}