import React,{useEffect, useState} from 'react';
import { makeStyles , withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
//import PropertyMapper from './PropertyMapper.js';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import { Grid } from '@material-ui/core';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//const axios = require('axios');
const mock = true;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    flexBasis: '33.33%',
    flexShrink: 0,
    textAlign:"left",
     color: theme.palette.info.contrastText,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.info.contrastText,
    flexBasis: '20%',
    textAlign:"left",
  },
    body1: {
      textAlign:"left",
  },
    body2: {
      textAlign:"left",
  }, 
  btns: {
  background: theme.palette.info.dark,
color: theme.palette.info.contrastText,
    '&:hover': {
       color: "#000000",
    }
  }
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#1976d2',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.success.light,
  },
}))(MuiAccordionDetails);

  
const materials = [ "SLA" , "PLA" ]
const types = [ "FDM" ]

function Task(props) {
  const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  const [taskState, setTaskState] = React.useState("closed");
  const [task, setTask] = React.useState({});

  useEffect(() => { 
    if(mock)
    {
        setTask({id:props.taskId,name:props.taskName,type:"FDM",material:"PLA",infill:"10%",modelUri:"",status:props.taskStatus,progress:60});
    }
    else{
    axios.get('/task/' + props.task.id).then(function (response){
    // handle success
        setTask(response.data);
        console.log(response);

    }).catch(function (error) {
        // handle error
       // setTasks({id:props.task.id,name:"horse"});
        console.log(error);
    }).then(function () {
    // always executed
    });
    }
  //setTask({id:props.taskId,name:props.taskName,type:"FDM",material:"PLA",infill:"10%",model:"",status:props.taskStatus,progress:60});
  },[]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
    const handleApprove = () => {
         axios.post('/task/' + task.id,{id:task.id,action:"approve"}).then(function (response){
            // handle success
            }).catch(function (error) {
                // handle error
                console.log(error);
            }).then(function () {
            // always executed
          });
    };
    const handleComplete = () => {
            axios.post('/task/' + task.id,{id:task.id,action:"complete"}).then(function (response){
            // handle success
            }).catch(function (error) {
                // handle error
                console.log(error);
            }).then(function () {
            // always executed
          });
    };
  return(
    <Grid item xs={12} md={8}>
    <Accordion expanded={expanded === props.taskId} onChange={handleChange(props.taskId)}>
    <AccordionSummary
    //  expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography className={classes.heading}>Task: {task.id}</Typography>
      <Typography className={classes.secondaryHeading}>{task.name}</Typography>
      <Typography className={classes.secondaryHeading}>{task.status}</Typography>
      <Box position="relative" display="inline-flex">
      <CircularProgress variant='determinent' value={task.progress}/>
        <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          task.progress,
        )}%`}</Typography>
        </Box>
        </Box>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container spacing={1}>
        <Grid item xs={6}>
        <Typography className={classes.body1}>ID:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.body2}>{task.id}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography className={classes.body1}>Name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.body2}>{task.name}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography className={classes.body1}>Type:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.body2}>{task.type}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography className={classes.body1}>Material:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.body2}>{task.material}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography className={classes.body1}>Infill:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.body2}>{task.infill}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography className={classes.body1}>Status:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.body2}>{task.status}</Typography>
        </Grid>
        {task.status === "pending" && <Grid item xs={12}><Button onClick={handleApprove} className={classes.btns}>Approve</Button></Grid>}
        {task.status === "printed" && <Grid item xs={12}><Button onClick={handleComplete} className={classes.btns}>Complete</Button></Grid>}
      </Grid>
    </AccordionDetails>
  </Accordion>
  </Grid>
  )
}

function NewTask(props) {
    const classes = useStyles();
    const [newTask, setNewTask] = React.useState({name:"",type:"",material:"",infill:0});
    
    const handleClose = () => {
        props.setOpen(false);
    };
    
      const handleSliderChange = (event, newValue) => {
    setNewTask(prevState => ({...prevState, infill:newValue}));
  };

  const handleInputChange = (event) => {
      var val = event.target.value === '' ? '' : Number(event.target.value);
      setNewTask(prevState => ({...prevState, infill:val}));

  };

  const handleBlur = () => {
    var val = Number(newTask.infill); 
    if (val < 0) {
      setNewTask(prevState => ({...prevState, infill:0}));
    } else if (val > 100) {
      setNewTask(prevState => ({...prevState, infill:100}));
    }
  };
  const handleChange = (event) => {
        setNewTask(prevState => ({...prevState, [event.target.name]:event.target.value}));
    };
    const handleFile = (event) => {
        setNewTask(prevState => ({...prevState, stlfile:event.target.files[0]}));
        
    };
  const handleSubmit = (event) => {
       event.preventDefault();
    console.log(newTask);
    if(!mock)
    {
       axios.post('/addtask',newTask).then(function (response){
            // handle success
            }).catch(function (error) {
                // handle error
                console.log(error);
            }).then(function () {
            // always executed
          });
    }
      props.setOpen(false);
  };
    return(
         <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="name" label="Name" name="name" onChange={handleChange}></TextField>
            </Grid>
            <Grid item xs={8}>
            <FormControl>
              <InputLabel id="type">Type</InputLabel><br/>
              <Select
                labelId="type"
                id="type"
                name="type"
                value={newTask.type}
                onChange={handleChange}
              >
              {types.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>)
                     )}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={8}>
            <FormControl>
              <InputLabel id="material">Material</InputLabel>
              <Select
                labelId="material"
                id="material"
                name="material"
                value={newTask.material}
                onChange={handleChange}
              >
              {materials.map((material) => (
                <MenuItem key={material} value={material} id="material">{material}</MenuItem>)
                         )}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={8}>
            <Typography>% Infill</Typography>
            <Slider
            value={typeof newTask.infill === 'number' ? newTask.infill : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            />
            <Input
              className={classes.input}
              value={newTask.infill}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 10,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            </Grid>
            <Grid item xs={8}>
            <input type="file" name="stlFile" onChange={handleFile} />
            </Grid>
            <Grid item xs={6}>
            <Button type="submit" className={classes.btns}>
              Submit
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={handleClose} className={classes.btns}>
              Cancel
            </Button>
            </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>);
}

export default function Tasks() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([{}]);
  const [filter, setFilter] = React.useState(0);

useEffect(() => {
    if(mock){
        setTasks([{id:"12",name:"horse",status:"completed"},{id:"13",name:"ship",status:"pending"},{id:"14",name:"cube",status:"processing"},{id:"15",name:"lever",status:"printed"},{id:"16",name:"dog",status:"processing"},{id:"17",name:"Holder",status:"processing"}]);
    }
    else{
    axios.get('/tasks').then(function (response){
            // handle success
            setTasks(response.data);
                console.log(response);

            }).catch(function (error) {
                // handle error
      //          setTasks([{id:"12",name:"horse"},
      //                            {id:"13",name:"ship"}]);
                console.log(error);
            }).then(function () {
            // always executed
          });
    }
    },[]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleFilterChange = (event) =>{
  
      setFilter(event.target.value);
    //handle filtering at server side
    };
  return (
    <Grid container>
    <Grid item xs={3}>
      <Button onClick={handleClickOpen} className={classes.btns}>Create Task</Button>
      </Grid>
      <Grid item xs={6}>
      </Grid>
      <Grid item>
      <InputLabel id="filter">Filter</InputLabel>
      <Select
        labelId="filter"
        id="filter"
        value={filter}
        onChange={handleFilterChange}
      >
        <MenuItem value={0}>All</MenuItem>
        <MenuItem value={1}>Open</MenuItem>
        <MenuItem value={2}>Completed</MenuItem>
      </Select>
    </Grid>
    
    <NewTask open={open} setOpen={setOpen} />
    {tasks.map((task) =>
            <Task taskId={task.id} taskStatus={task.status} taskName={task.name} key={task.id} />
        )}
    </Grid>
  );
}
