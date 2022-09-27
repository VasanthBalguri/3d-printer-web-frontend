import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import PropertyMapper from './PropertyMapper.js';
import axios from 'axios';
//import Box from '@material-ui/material/Box';
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetMachines, asyncAddMachine, asyncGetMachine, setMachine, setMachines} from './MachinesSlice.js'
const mock = true;

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
  },
  paper: {
  padding: theme.spacing(1),
  textAlign: 'left',
  backgroundColor: theme.palette.success.light,
  border:1,
  borderColor: 'black',
  minWidth: 100,
},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
  },
  btns: {
  background: theme.palette.info.dark,
   color: theme.palette.info.contrastText,
       '&:hover': {
       color: "#000000",
    }
  },
}
));

const materials = [ "SLA" , "PLA" ]
const types = [ "FDM" ]

function Machine(props) {
  const classes = useStyles();
  //const [machine,setMachine] = React.useState({});
  const machine = useSelector((state) => state.machines.machines.find(machine => machine.id == props.machineId));
  const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
      if(mock){
          //setMachine({id:props.machineId,name:props.machineName,type:"FDM",material:"PLA",temprature:30,status:"Idle"});
        dispatch(asyncGetMachine(props.machineId))
      }
      else{
          axios.get('/machine/' + props.machine.id).then(function (response){
      // handle success
      setMachine(response.data);
      console.log(response);
      }).catch(function (error) {
      // handle error
      //setMachine({id:props.machine.id,name:"ultimaker"})
      console.log(error);
      }).then(function () {
      // always executed
      });
      }
  },[]);

  const handleClose = () => {
    setOpen(false);
  };
  
    const handleOpen = () => {
    
    setOpen(true);
  };
  
  return(
    <Paper elevation={2} className={classes.paper}>
      <Grid container alignItems="flex-start" spacing={1}>
        <Grid item xs={9}>
          <Typography className={classes.title}>{machine.id}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{machine.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Type:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{machine.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Material:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{machine.material}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Temprature:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{machine.temprature}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Status:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{machine.status}</Typography>
        </Grid>
      </Grid>
      <Button className={classes.btns} onClick={handleOpen}>monitor</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{machine.id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Monitor
          </DialogContentText>
            <img id="play" src="" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.btns}>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

function NewMachine(props) {
    const classes = useStyles();
    const [newMachine, setNewMachine] = React.useState({name:"",type:"",material:"",url:""});
    
      const handleClose = () => {
        props.setOpen(false);
        };
      const handleSubmit = (event) => {
           event.preventDefault();
          //console.log(newMachine);
           console.log(newMachine);
           if(!mock)
           {
           axios.post('/addMachine',newMachine).then(function (response){
            // handle success
            }).catch(function (error) {
                // handle errorsetMachine
          });
           }
          props.setOpen(false);
  
    }
      const handleChange = (event) => {
        setNewMachine(prevState => ({...prevState, [event.target.name]:event.target.value}));
    };
        return(
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Printer</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="name" label="Name" name="name" onChange={handleChange}></TextField>
            </Grid>
            <Grid item xs={12}>
            <FormControl>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                name="type"
                value={newMachine.type}
                onChange={handleChange}
              >
              {types.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>))
              }
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl>
              <InputLabel id="material">Material</InputLabel>
              <Select
                labelId="material"
                id="material"
                name="material"
                value={newMachine.material}
                onChange={handleChange}
              >
              {materials.map((material) => (
                <MenuItem key={material} value={material}>{material}</MenuItem>)
                         )}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <TextField id="url" label="Url" name="url" onChange={handleChange}></TextField>
            </Grid>
            <Grid item xs={6}>
        <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          </Grid>
          <Grid item xs={6}>
        <Button type="submit" color="primary">
            Submit
          </Button>
          </Grid>
          </Grid>
          </form>
        </DialogContent>
        <DialogActions>


        </DialogActions>
      </Dialog>);
}

export default function Machines() {
  const classes = useStyles();
  //const [machines, setMachines] = React.useState([]);
  const machines = useSelector((state) => state.machines.machines);
 // const machineSize = useSelector((state) => state.len);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
      if(mock)
      {
        //dispatch(setMachines([{id:"M-02",name:"ultimaker"},{id:"M-03",name:"tevo"}]));
         // setMachines([{id:"M-02",name:"ultimaker"},{id:"M-03",name:"tevo"}]);
        dispatch(asyncGetMachines());
        }
      else
      {
      axios.get('/machines').then(function (response){
      // handle success
      setMachines(response.data);
      }).catch(function (error) {
      // handle error
      console.log(error);
      }).then(function () {
      // always executed
      });
      }
    },[]);

    const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  return(
    <Grid container spacing={2}>
    <Grid item xs={4}>
    <Button className={classes.btns} onClick={handleClickOpen}>New Printer</Button>
    </Grid>
    <Grid item xs={8}>
    </Grid>
     
    <NewMachine open={open} setOpen={handleClose} />
    {machines.length > 0 && <div><Grid container spacing={2}>{machines.map((machine) =>
        <Grid item md={4} xs={12}>
        <Machine machineId={machine.id} machineName={machine.name} key={machine.id} />
        </Grid>
    )}</Grid></div>}
      
    </Grid>
  );
}
