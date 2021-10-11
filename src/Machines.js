import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import PropertyMapper from './PropertyMapper.js';
import axios from 'axios';
//import Box from '@material-ui/material/Box';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
  },
  paper: {
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth: 100,
  maxWidth: 100,
},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));


function Machine(props) {
  const classes = useStyles();
  const [attributes, setAttributes] = useState([{}]);
  //const [id,setId] = useState(0);
  //const [name,setName] = useState("");
  //const [attributes,setAttributes] = useState([{attributeName:"",attributeType:"",attributeValue:""}]);
  //const bull = <span className={classes.bullet}>•</span>;

  useEffect(() => {
    /*function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };*/
     //console.log(props.machine.attributes)
    //setAttributes(props.machine.attributes)
  });

  return(
    <Paper elevation={2} className={classes.paper}>
      <div className={classes.id}>{props.machine.id}</div>
      <div className={classes.name}>{props.machine.name}</div>
      <PropertyMapper attributes={props.machine.attributes} />
    </Paper>
  );
}

export default function Machines() {
  const classes = useStyles();
  const [machines, setMachines] = React.useState([{}]);
    useEffect(() => {
      axios.get('http://localhost:3000/machines').then(function (response){
      // handle success
      setMachines(response.data);
      console.log(response);
      }).catch(function (error) {
      // handle error
      setMachines([{id:"12",name:"ultimaker",attributes:[{attributeName:"print-task-name",attributeType:"static",attributeValue:"taks1"},
                                                    {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"20"}]},
                        {id:"13",name:"tevo",attributes:[{attributeName:"print-task-name",attributeType:"static",attributeValue:"taks1"},
                                                              {attributeName:"estimated-time",attributeType:"dynamic",attributeValue:"50"}]}])
      console.log(error);
      }).then(function () {
      // always executed
      });
    });

  return(
    <Grid container spacing={2}>
    {machines.map((machine) =>
      <Grid item xs={2}>
          <Machine machine={machine} key={machine.id} xs={8}/>
      </Grid>
    )}
    </Grid>
  );
}
