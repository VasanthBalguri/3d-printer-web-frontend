import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

function TextInput(props){
    
    return(
      <div>
        <Typography variant="body2" gutterBottom >props.variable</Typography>
        <TextField id=props.id label="enter value" />
        </div>
    );
}

function Checkbox(){
    
    return(
      <div>
         <Typography variant="body2" gutterBottom >props.variable</Typography>
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
        </div>
    );
}

function Lov(){
        return(
        <div>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </div>
    );
}

function DateAndTime(){
}

function Slider(){
}

function fileDrop(){
}

export default function InputForm(props){
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {      
        if(props.attributes != undefined){
        setLoaded(true);
      }
      },[]);
    
  return(
    <div>
    </div>
  );
    
}
