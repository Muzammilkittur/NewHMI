import React, {useEffect, useState} from "react";
import { Grid, Box, Stack, Button, TextField, InputAdornment } from '@mui/material';
import axios from "axios";


function Settings_QS() {
  
  




  useEffect(() => {
    const intervalId = setInterval(() => {
        fetchSettingsQS();
    }, 500);

    return () => clearInterval(intervalId);
}, []);



  

  //------------------------Get---Settings QS PLC------------------------------------------------------------------------------------------------
  
  // Settings QS
  const [mover1_same, setmover1_same]=useState('');
  const [mover2_same, setmover2_same]=useState('');
  const [mover3_same, setmover3_same]=useState('');
  const [mover4_same, setmover4_same]=useState('');
  const [mover1_change, setmover1_change]=useState('');
  const [mover2_change, setmover2_change]=useState('');
  const [mover3_change, setmover3_change]=useState('');
  const [mover4_change, setmover4_change]=useState('');



  
  const fetchSettingsQS = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/settings_QS', {
        
        headers: {
          'Accept': 'application/json'
        }
      });
      

      // Settings QS
      setmover1_same(response.data.mover1_same);
      setmover2_same(response.data.mover2_same);
      setmover3_same(response.data.mover3_same);
      setmover4_same(response.data.mover4_same);
      setmover1_change(response.data.mover1_change);
      setmover2_change(response.data.mover2_change);
      setmover3_change(response.data.mover3_change);
      setmover4_change(response.data.mover4_change);
  
     
      
     
      

    } catch (error) {
      console.error('Error fetching tag values:', error);
    }
  };
  //----------------end of Get---Settings QS PLC--------------------------------------------------










// ----------========Textfield Enter Data===========
  
const [M1same, setM1same] = useState('');
const [M2same, setM2same] = useState('');
const [M3same, setM3same] = useState('');
const [M4same, setM4same] = useState('');
const [M1Change, setM1Change] = useState('');
const [M2Change, setM2Change] = useState('');
const [M3Change, setM3Change] = useState('');
const [M4Change, setM4Change] = useState('');





async function postSettings_QSToApi(M1same, M2same, M3same, M4same, M1Change, M2Change, M3Change, M4Change) {
  const apiUrl = 'http://127.0.0.1:8000/post_settings_QS';
  const data = {
    M1_same: M1same,
    M2_same: M2same,
    M3_same: M3same,
    M4_same: M4same,
    M1_change: M1Change,
    M2_change: M2Change,
    M3_change: M3Change,
    M4_change: M4Change,
    
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
    postSettings_QSToApi(M1same, M2same, M3same, M4same, M1Change, M2Change, M3Change, M4Change);
  };












  return (
    <Grid container className='App' justifyContent="center" alignItems="center">

      <Grid item >
        <Box  style={{backgroundColor: '#e6fff2'}}>
                <h2>Same Path Velocity</h2>
        <Stack direction='row' spacing={1.5}>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM1same(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover1_same} size='small' id="outlined-basic" label="Mover-1" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM2same(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover2_same} size='small' id="outlined-basic" label="Mover-2" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM3same(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover3_same} size='small' id="outlined-basic" label="Mover-3" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM4same(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover4_same} size='small' id="outlined-basic" label="Mover-4" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

        </Stack>

        <h2>Path Change Velocity</h2>
        <Stack direction='row' spacing={1.5}>
            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM1Change(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover1_change} size='small' id="outlined-basic" label="Mover-1" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM2Change(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover2_change} size='small' id="outlined-basic" label="Mover-2" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM3Change(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover3_change} size='small' id="outlined-basic" label="Mover-3" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>

            <TextField variant="outlined" size="small" style={{ width: 50 }} onChange={(e) => setM4Change(e.target.value)}
              InputProps={{sx: { backgroundColor: '#ffff', height: '30px'  }}}/>

            <TextField value={mover4_change} size='small' id="outlined-basic" label="Mover-4" style={{ width: 110 }} 
              InputProps={{readOnly:true, sx: { backgroundColor: '#f0f0f0', height: '30px'  }, endAdornment: <InputAdornment position="end">mm/s</InputAdornment>}} 
              InputLabelProps={{shrink: true}}/>
        </Stack>

       
       

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

export default Settings_QS;
