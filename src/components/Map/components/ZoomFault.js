import React from 'react'
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  zoomFaultBox: {
    padding: '0px 15px',
    backgroundColor: "white",
    margin: 0,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    left: "2vw",
    top: '80px',
    height: '29px',
    position: "absolute",
    borderRadius: '4px',
    color: 'red'
  }
}))


export default function ZoomFault(props) {
    const classes = useStyles();
    
    if (props.zoomFaultStatus) {
      return (
        <div className={classes.zoomFaultBox}>
          Please zoom in to enable group track
        </div>
      )
    } else {
      return null
    } 
}