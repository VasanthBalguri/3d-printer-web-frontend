import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  name: {
  },
  id: {
  }
}));

function TextField(){
    
}

function VideoFeed(){
    
}

function Model(){

}

export default function PropertyMapper(props){
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      if(props.attributes != undefined){
        setLoaded(true);
      }
    },[]);
  return(
    <div>
    {
      loaded &&
    <div>
    {props.attributes.map((attr) =>
    <div key={attr.attributeName}>
        {attr.attributeType == 'static' ?
        <div className={classes.propName}>{attr.attributeName}</div>:<div className={classes.propNameDynamic}>{attr.attributeName}</div>}
        {attr.attributeType == 'static' ?
        <div className={classes.propValue}>{attr.attributeValue}</div>:<div className={classes.propValue}>{attr.attributeValue}</div>
        }
    </div>
  )}
    </div>
  }
  </div>
  );
}
