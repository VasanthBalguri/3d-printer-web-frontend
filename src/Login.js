import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux'
import { asyncLogin, setUserName, setPassword } from './LoginSlice.js';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      fontSize: 22,
    },
    btns: {
    background: theme.palette.info.dark,
    color: theme.palette.info.contrastText,
    '&:hover': {
       color: "#000000",
    }
    },
    h2:{
        backgroundColor:theme.palette.info.dark,
    },
  paper: {
  padding: theme.spacing(1),
  textAlign: 'left',
  backgroundColor: theme.palette.info.light,
  border:1,
  borderColor: 'black',
  minWidth: 100,
    },
    textField: {
     color: theme.palette.info.contrastColor,
         
    }
    
  }));

const mock = false;
export default function Login(props)
{
    const classes = useStyles();
    //const [userName,setUserName] = React.useState("");
    //const [password,setPassword] = React.useState("");
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleSubmit = async e => {
         e.preventDefault();
         dispatch(asyncLogin());
        /*if(mock)
        {
            props.setLogin(true);
            props.setAdmin(true);
        }
        else{
        axios.post('/login',{"userName":userName,"password":password}).then(function (response){
            // handle success
            console.log(response)
            if(response.data.login == true)
            props.setLogin(true);
            
            if(response.data.isAdmin == true)
            props.setAdmin(true);
            
            }).catch(function (error) {
                // handle error
            }).then(function () {
            // always executed
          });
        }*/
    }
return(
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
    <Grid item xs={12}><Typography variant="h2" className={classes.h2}>Please Login</Typography> </Grid>
    <Grid item xs={12} md={6}>
    <Paper elevation={2} className={classes.paper}>
    <form onSubmit={handleSubmit}>
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
    <Grid item xs={12}>
    <TextField id="userName" fullWidth label="User Name" className={classes.textField} variant="filled"  onChange={e => dispatch(setUserName(e.target.value))}></TextField>
    </Grid>
    <Grid item xs={12}>
    <TextField id="password" fullWidth label="Password" className={classes.textField} variant="filled"  onChange={e => dispatch(setPassword(e.target.value))}></TextField>
    </Grid>
    <Grid item xs={12}>
    <Button type="submit" fullWidth className={classes.btns}>Login</Button>
    </Grid>
    </Grid>
    </form>
    </Paper>
    </Grid>
    </Grid>
);
}
