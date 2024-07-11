import React, { useState, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Link, useLocation, useHistory } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { IconButton, Avatar, Box, Tabs, Tab } from "@material-ui/core";
import ProfilePopover from "../pages/ProfilePopover";
import CKlogo from './CKlogo.svg';
import { AppBar, Toolbar, CssBaseline, Typography, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(1), // Reduced spacing
    display: "flex"
  },
  link: {
    textDecoration: "none",
    color: 'white',
    fontSize: "20px",
    "&:hover": {
      color: 'white',
    },
    textTransform: "none", // Ensure text is not in uppercase
    display: "flex", // Make sure icon and text are in the same row
    alignItems: "center",
    transition: 'all 0.3s ease-in-out', // Add transition for smooth effect
  },
  tabRoot: {
    minWidth: "auto", // Reduce minimum width of each tab
    marginRight: theme.spacing(1), // Reduce margin between tabs
  },
  activeLink: {
    color: '#FFD700', // Highlight color for active tab
  },
  dateTime: {
    marginLeft: "auto", // Aligns date and time to the right
    color: "white",
    fontSize: "16px",
  },
  appBar: {
    backgroundColor: "teal", // Navbar Color change
  },
  
  iconButton: {
    borderRadius: 0, // Make the IconButton rectangular
    color: 'white',
  },
}));


const getColor = (state) => {
  switch(state) {
    case 'Idle':
      return '#1FFC04';
    case 'Execute':
      return '#1FFC04';
    case 'Aborting':
      return 'yellow';
    case 'Aborted':
      return 'red';
    case 'Resetting':
      return 'blue';
    case 'Clearing':
      return 'yellow';
    case 'Stopped':
      return 'red';
    default:
      return 'grey';
  }
};




function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [dateTime, setDateTime] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation(); // Get the current location
  const history = useHistory(); // Use history for navigation
  

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
      fetchPackML();
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [sState, setsState] = useState("None");

  const fetchPackML = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/manual_packML', {
        headers: {
          'Accept': 'application/json'
        }
      });

      setsState(response.data.sState);


    } catch (error) {
      console.error('Error fetching tag Get values:', error);
      // alert('Error fetching data from the PLC. Please check the connection.');
    }
  };



  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleTabChange = (event, newValue) => {
    history.push(newValue); // Navigate to the new route
  };

  const tabValue = location.pathname; // Get the current route







  return (
    
    <div>
      <AppBar position="static" className={classes.appBar}>
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            <img src={CKlogo} alt="Logo" style={{ height: 55, paddingTop: '10px', marginRight: 10 }} />
          </Typography>
          <Box sx={{ color: 'black', bgcolor: getColor(sState), p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }} borderRadius={5} maxWidth={100} minWidth={100}>
             {sState}
          </Box>


          {isMobile ? (
            <DrawerComponent />
          ) : (
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              className={classes.navlinks}
              TabIndicatorProps={{ style: { backgroundColor: '#FFD700' } }} // Change the indicator color here
            >
              <Tab
                label={<span className={classes.link}><HomeIcon />&nbsp;Main</span>}
                value="/mainpage"
                classes={{ root: classes.tabRoot }}
                component={Link}
                to="/mainpage"
              />
              <Tab
                label={<span className={classes.link}><EngineeringIcon />&nbsp;Manual</span>}
                value="/manualpage"
                classes={{ root: classes.tabRoot }}
                component={Link}
                to="/manualpage"
              />
              <Tab
                label={<span className={classes.link}><TuneIcon />&nbsp;Diagnostics</span>}
                value="/diagnosticspage"
                classes={{ root: classes.tabRoot }}
                component={Link}
                to="/diagnosticspage"
              />
              <Tab
                label={<span className={classes.link}><NotificationsActiveIcon />&nbsp;Alarms</span>}
                value="/alarmsPage"
                classes={{ root: classes.tabRoot }}
                component={Link}
                to="/alarmsPage"
              />
              <Tab
                label={<span className={classes.link}><SettingsIcon />&nbsp;Settings</span>}
                value="/settingspage"
                classes={{ root: classes.tabRoot }}
                component={Link}
                to="/settingspage"
              />
            </Tabs>
          )}
          <div className={classes.dateTime}>{dateTime.toLocaleString()}</div>, 
          <div>&nbsp; Muzammil</div>


          <Box>
              <IconButton sx={{ p: 2 }} onClick={handleProfileClick} className={classes.iconButton}>
             <Avatar alt="login" />
              </IconButton>
            <ProfilePopover open={open} anchorEl={anchorEl} onClose={handleProfileClose} />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;