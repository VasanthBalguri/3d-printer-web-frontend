import React, { Component, useState, useEffect } from "react";
//import { Router, Switch, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Container from '@material-ui/core/Container';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import Tasks from './Tasks.js';
import Machines from './Machines.js';
import WorkflowEditor from './WorkflowEditor.js'
import Login from './Login.js';
//const axios = require('axios');

export default function App() {
  const [isLoggedin,setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
    {isLoggedin == true ?
      <SimpleTabs isAdmin={isAdmin} />:<Login setLogin={setIsLoggedin} setAdmin={setIsAdmin}/>}
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Typography component="h2" variant="h2">3D Printer App</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Tasks" {...a11yProps(0)} />
          <Tab label="Printers" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Tasks />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Machines />
      </TabPanel>
    </div>
  );
}
