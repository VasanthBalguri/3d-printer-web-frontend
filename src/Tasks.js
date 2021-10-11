import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import PropertyMapper from './PropertyMapper.js';

import axios from 'axios';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Tasks() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([{}]);

useEffect(() => {
    axios.get('http://localhost:3000/tasks').then(function (response){
            // handle success
            setTasks(response.data);
                console.log(response);

            }).catch(function (error) {
                // handle error
                setTasks([{id:"12",name:"horse",attributes:[{attributeName:"printer-id",attributeType:"static",attributeValue:"printer1"},
                                                              {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"20"}]},
                                  {id:"13",name:"ship",attributes:[{attributeName:"printer-id",attributeType:"static",attributeValue:"printer2"},
                                                                        {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"50"}]}]);
                console.log(error);
            }).then(function () {
            // always executed
          });
    });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
    <Button color="#000000" onClick={handleClickOpen}>Create Task</Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">New Task</DialogTitle>
  <DialogContent>
    <DialogContentText>
      New Task
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Email Address"
      type="email"
      fullWidth
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleClose} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>
    <div>
    {tasks.map((task) =>
      <Accordion expanded={expanded === task.id} onChange={handleChange(task.id)}>
        <AccordionSummary
        //  expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{task.id}</Typography>
          <Typography className={classes.secondaryHeading}>{task.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <PropertyMapper attributes={task.attributes} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    )}
    </div>
    </div>
  );
}
