import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const BotTable = ({ selectedBot }) => {
  const [botData, setBotData] = useState({});

  useEffect(() => {
    const fetchDiagnosticBotDetails = async (number) => {
      try {
        const responses = await Promise.all(['X', 'Y1', 'Y2', 'Z'].map(axis =>
          axios.get('http://127.0.0.1:8000/diagnostics_Bot_Details', {
            params: {
              number: number,
              axis: axis,
            },
            headers: {
              'Accept': 'application/json'
            }
          })
        ));
        const data = {};
        responses.forEach((response, index) => {
          data[`axis${index}`] = response.data;
        });
        setBotData(data);
      } catch (error) {
        console.error('Error fetching bot details:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchDiagnosticBotDetails(selectedBot);
    }, 500);

    return () => clearInterval(intervalId);
  }, [selectedBot]);

  const createData = (name, axis0, axis1, axis2, axis3) => ({ name, axis0, axis1, axis2, axis3 });

  const columns = ['Status', 'Width_Adjuster', 'Arm_1', 'Arm_2', 'Lift'];
  const rows = [
    createData('Enable', botData.axis0?.enable? 'True':'False', botData.axis1?.enable?'True':'False', botData.axis2?.enable? 'True':'False', botData.axis3?.enable? 'True':'False'),
    createData('Home', botData.axis0?.home? 'True':'False', botData.axis1?.home? 'True':'False', botData.axis2?.home? 'True':'False', botData.axis3?.home? 'True':'False'),
    createData('Fault', botData.axis0?.fault? 'True':'False', botData.axis1?.fault? 'True':'False', botData.axis2?.fault? 'True':'False', botData.axis3?.fault? 'True':'False'),
    createData('Act Pos(mm)', botData.axis0?.act_pos, botData.axis1?.act_pos, botData.axis2?.act_pos, botData.axis3?.act_pos),
    createData('Act_Velocity(mm/s)', botData.axis0?.act_vel, botData.axis1?.act_vel, botData.axis2?.act_vel, botData.axis3?.act_vel),
    createData('Act Current(A)', botData.axis0?.act_current, botData.axis1?.act_current, botData.axis2?.act_current, botData.axis3?.act_current),
    createData('Act Torque(Nm)', botData.axis0?.act_torque, botData.axis1?.act_torque, botData.axis2?.act_torque, botData.axis3?.act_torque),
    createData('Act Temp(°C)', botData.axis0?.act_temp, botData.axis1?.act_temp, botData.axis2?.act_temp, botData.axis3?.act_temp),
  ];

  return (
    <TableContainer component={Paper} style={{ maxHeight: 400, backgroundColor:'#e6fff2' }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell  key={column} style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ padding: '4px 16px' }}>{row.name}</TableCell>
              <TableCell  align='center' style={{ padding: '4px 16px', backgroundColor: row.axis0 === 'True' ? '#1FFC04' : '' }}>{row.axis0 || '0'}</TableCell>
              <TableCell  align='center' style={{ padding: '4px 16px', backgroundColor: row.axis1 === 'True' ? '#1FFC04' : '' }}>{row.axis1 || '0'}</TableCell>
              <TableCell  align='center' style={{ padding: '4px 16px', backgroundColor: row.axis2 === 'True' ? '#1FFC04' : '' }}>{row.axis2 || '0'}</TableCell>
              <TableCell  align='center' style={{ padding: '4px 16px', backgroundColor: row.axis3 === 'True' ? '#1FFC04' : '' }}>{row.axis3 || '0'}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BotTable;
