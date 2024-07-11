import React, {useEffect, useState} from "react";
import { Grid, Box, Stack, Button, TextField, InputAdornment } from '@mui/material';
import axios from "axios";


function SafeTravelPosition() {
  
  




  useEffect(() => {
    const intervalId = setInterval(() => {
        fetchSettingsSTP();
    }, 500);

    return () => clearInterval(intervalId);
}, []);



  

  //------------------------Get---Settings STP PLC------------------------------------------------------------------------------------------------
  
  // Settings STP
  const [bot1_safe, setbot1_safe]=useState('');
  const [bot2_safe, setbot2_safe]=useState('');
  const [bot3_safe, setbot3_safe]=useState('');
  const [bot4_safe, setbot4_safe]=useState('');
  const [bot1_retrieve, setbot1_retrieve]=useState('');
  const [bot2_retrieve, setbot2_retrieve]=useState('');
  const [bot3_retrieve, setbot3_retrieve]=useState('');
  const [bot4_retrieve, setbot4_retrieve]=useState('');
  const [bot1_QS, setbot1_QS]=useState('');
  const [bot2_QS, setbot2_QS]=useState('');
  const [bot3_QS, setbot3_QS]=useState('');
  const [bot4_QS, setbot4_QS]=useState('');

  
  

  

  
  const fetchSettingsSTP = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/settings_STP', {
        
        headers: {
          'Accept': 'application/json'
        }
      });
      

      // Settings STP
      setbot1_safe(response.data.bot1_safe);
      setbot2_safe(response.data.bot2_safe);
      setbot3_safe(response.data.bot3_safe);
      setbot4_safe(response.data.bot4_safe);
      setbot1_retrieve(response.data.bot1_retrieve);
      setbot2_retrieve(response.data.bot2_retrieve);
      setbot3_retrieve(response.data.bot3_retrieve);
      setbot4_retrieve(response.data.bot4_retrieve);
      setbot1_QS(response.data.bot1_QS);
      setbot2_QS(response.data.bot2_QS);
      setbot3_QS(response.data.bot3_QS);
      setbot4_QS(response.data.bot4_QS);
     
      
     
      

      
      
      

    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };
  //----------------end of Get---Settings STP PLC--------------------------------------------------










// ----------========Textfield Enter Data===========
  
const [B1safe, setB1safe] = useState('');
const [B2safe, setB2safe] = useState('');
const [B3safe, setB3safe] = useState('');
const [B4safe, setB4safe] = useState('');
const [B1Retrieve, setB1Retrieve] = useState('');
const [B2Retrieve, setB2Retrieve] = useState('');
const [B3Retrieve, setB3Retrieve] = useState('');
const [B4Retrieve, setB4Retrieve] = useState('');
const [B1Qstick, setB1Qstick] = useState('');
const [B2Qstick, setB2Qstick] = useState('');
const [B3Qstick, setB3Qstick] = useState('');
const [B4Qstick, setB4Qstick] = useState('');





async function postSettings_STPToApi(B1safe, B2safe, B3safe, B4safe, B1Retrieve, B2Retrieve, B3Retrieve, B4Retrieve, B1Qstick, B2Qstick, B3Qstick, B4Qstick) {
  const apiUrl = 'http://127.0.0.1:8000/post_settings_STP';
  const data = {
    B1_safe: B1safe,
    B2_safe: B2safe,
    B3_safe: B3safe,
    B4_safe: B4safe,
    B1_retrieve: B1Retrieve,
    B2_retrieve: B2Retrieve,
    B3_retrieve: B3Retrieve,
    B4_retrieve: B4Retrieve,
    B1_Qstick: B1Qstick,
    B2_Qstick: B2Qstick,
    B3_Qstick: B3Qstick,
    B4_Qstick: B4Qstick,
    
  };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Data posted successfully!');
        // You may want to perform additional actions upon successful submission
      } else {
        console.error('Failed to post data to the API.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
}
  // -----===============



  const handleFormSubmit = () => {
    postSettings_STPToApi(B1safe, B2safe, B3safe, B4safe, B1Retrieve, B2Retrieve, B3Retrieve, B4Retrieve, B1Qstick, B2Qstick, B3Qstick, B4Qstick);
  };












  return (
    <Grid container className='App' justifyContent="center" alignItems="center">

      <Grid item >
        <Box  style={{backgroundColor: '#e6fff2'}}>
                <h2>Fork Arm Safe Travel position</h2>
        <Stack direction='row' spacing={1.5}>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB1safe(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot1_safe} size='small' id="outlined-basic" label="Bot-1" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB2safe(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot2_safe} size='small' id="outlined-basic" label="Bot-2" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB3safe(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot3_safe} size='small' id="outlined-basic" label="Bot-3" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB4safe(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot4_safe} size='small' id="outlined-basic" label="Bot-4" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

        </Stack>

        <h2>Fork Arm Retrieve Offset</h2>
        <Stack direction='row' spacing={1.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB1Retrieve(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot1_retrieve} size='small' id="outlined-basic" label="Bot-1" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB2Retrieve(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot2_retrieve} size='small' id="outlined-basic" label="Bot-2" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB3Retrieve(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot3_retrieve} size='small' id="outlined-basic" label="Bot-3" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB4Retrieve(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot4_retrieve} size='small' id="outlined-basic" label="Bot-4" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
        </Stack>

        <h2>Position QuickStick Offset</h2>
        <Stack direction='row' spacing={1.5}>
        <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB1Qstick(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot1_QS} size='small' id="outlined-basic" label="Mover-1" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB2Qstick(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot2_QS} size='small' id="outlined-basic" label="Bot-Mover-2" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB3Qstick(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot3_QS} size='small' id="outlined-basic" label="Mover-3" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setB4Qstick(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={bot4_QS} size='small' id="outlined-basic" label="Mover-4" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

        </Stack>

        {/* <h2>Quick Stick Velocity</h2>
        <Stack direction='row' spacing={1.5}>
            <TextField label="Bot-1" size="small"  style={{ width: 150 }} 
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>

            <TextField label="Bot-2" size="small"  style={{ width: 150 }} 
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>

            <TextField label="Bot-3" size="small"  style={{ width: 150 }} 
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>

            <TextField label="Bot-4" size="small"  style={{ width: 150 }} 
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px' },endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}}
              InputLabelProps={{shrink: true}}/>
        </Stack> */}

        <Stack justifyContent="center" alignItems="center" paddingTop={1.5}>
        <Button variant="contained" onClick=   {handleFormSubmit}>
                  Submit
                </Button>
        </Stack>




       </Box>
      </Grid>


    </Grid>
  );
}

export default SafeTravelPosition;
