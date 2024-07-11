import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Avatar, Stack } from '@mui/material';

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company, setCompany] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Muzammil' && password === '1234') {
      console.log('Logged in successfully');
      // Add your logic for successful login here, such as redirecting to another page
    } else {
      console.log('Invalid username or password');
      // Add your logic for displaying an error message to the user
    }
  };
  

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signing up with the following data:');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Company:', company);
    console.log('Job Role:', jobRole);
    console.log('Profile Picture:', profilePicture);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm">
      {!showSignup ? (
        <form onSubmit={handleLogin}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
          <Button onClick={toggleSignup} fullWidth style={{ marginTop: '1rem' }}>
            Sign Up
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          {profilePicture && (
        <Box display="flex" justifyContent="center" marginBottom="1rem">
          <Avatar alt="Profile Picture" src={profilePicture} sx={{ width: 65, height: 60 }} />
        </Box>
      )}
         <Stack spacing={1} direction='row'>
         <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
         </Stack>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Stack spacing={1} paddingBottom={1} direction='row'>
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            margin="normal"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          
          <TextField
            label="Job Role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
          </Stack>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: '1rem' }}
          >
            Sign Up
          </Button>
          <Button onClick={toggleSignup} fullWidth style={{ marginTop: '1rem' }}>
            Back to Login
          </Button>
        </form>
      )}
    </Container>
  );
};

export default LoginPage;
