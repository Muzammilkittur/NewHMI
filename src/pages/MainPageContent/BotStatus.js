import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const BotStatus = ({ selectedBot }) => {
  const [botData, setBotData] = useState({});
  const [BotPosition, setBotPosition] = useState(null);

  useEffect(() => {
    const fetchMainBotDetails = async (number) => {
      try {
        const responses = await Promise.all(['X', 'Y1', 'Y2', 'Z'].map(axis =>
          axios.get('http://127.0.0.1:8000/Main_Bot_status', {
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
        setBotPosition(data[`axis0`]?.bot_position)
      } catch (error) {
        console.error('Error fetching bot details:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchMainBotDetails(selectedBot);
    }, 100);

    return () => clearInterval(intervalId);
  }, [selectedBot]);

  const createData = (name, axis0, axis1, axis2, axis3) => ({ name, axis0, axis1, axis2, axis3 });

  const columns = [`Bot ${selectedBot} : ${BotPosition || '0'}mm`, 'X', 'Y1', 'Y2', 'Z'];
  const rows = [
    createData('Enable', botData.axis0?.enable, botData.axis1?.enable, botData.axis2?.enable, botData.axis3?.enable),
    createData('Home', botData.axis0?.home, botData.axis1?.home, botData.axis2?.home, botData.axis3?.home),
    createData('Fault', botData.axis0?.fault, botData.axis1?.fault, botData.axis2?.fault, botData.axis3?.fault),
    createData('Position(mm)', botData.axis0?.act_pos, botData.axis1?.act_pos, botData.axis2?.act_pos, botData.axis3?.act_pos),
  ];

  const renderEnable = (value) => (value ? 'Enabled' : 'Disabled');
  const renderHome = (value) => <OtherHousesIcon style={{ color: value ? 'green' : 'gray' }} />;
  const renderFault = (value) => value ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />;

  return (
    <TableContainer component={Paper} style={{ maxHeight: 400, backgroundColor:'#e6fff2' }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                style={{
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  minWidth: '80px',
                  maxWidth: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ padding: '4px 16px', width: '80px' }}>{row.name}</TableCell>
              <TableCell align='center' style={{ padding: '4px 16px', backgroundColor: row.name === 'Position(mm)' ? '' : (row.axis0 ? '#1FFC04' : ''), width: '100px' }}>
                <Box width="100%">
                  {row.name === 'Enable' ? renderEnable(row.axis0) :
                   row.name === 'Home' ? renderHome(row.axis0) :
                   row.name === 'Fault' ? renderFault(row.axis0) :
                   row.axis0 || '0'}
                </Box>
              </TableCell>
              <TableCell align='center' style={{ padding: '4px 16px', backgroundColor: row.name === 'Position(mm)' ? '' : (row.axis1 ? '#1FFC04' : ''), width: '100px' }}>
                <Box width="100%">
                  {row.name === 'Enable' ? renderEnable(row.axis1) :
                   row.name === 'Home' ? renderHome(row.axis1) :
                   row.name === 'Fault' ? renderFault(row.axis1) :
                   row.axis1 || '0'}
                </Box>
              </TableCell>
              <TableCell align='center' style={{ padding: '4px 16px', backgroundColor: row.name === 'Position(mm)' ? '' : (row.axis2 ? '#1FFC04' : ''), width: '100px' }}>
                <Box width="100%">
                  {row.name === 'Enable' ? renderEnable(row.axis2) :
                   row.name === 'Home' ? renderHome(row.axis2) :
                   row.name === 'Fault' ? renderFault(row.axis2) :
                   row.axis2 || '0'}
                </Box>
              </TableCell>
              <TableCell align='center' style={{ padding: '4px 16px', backgroundColor: row.name === 'Position(mm)' ? '' : (row.axis3 ? '#1FFC04' : ''), width: '100px' }}>
                <Box width="100%">
                  {row.name === 'Enable' ? renderEnable(row.axis3) :
                   row.name === 'Home' ? renderHome(row.axis3) :
                   row.name === 'Fault' ? renderFault(row.axis3) :
                   row.axis3 || '0'}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BotStatus;
