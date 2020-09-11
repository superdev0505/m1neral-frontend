import React, { useContext,useState } from 'react';
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import { AppContext } from '../../AppContext'
import RigIcon from './components/svgIcons/RigIcon'
import moment from 'moment'


const useStyles = makeStyles(theme => ({
    iconContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    },
    tex1: {
      colorPrimary: 'white'
    }
  }))


const formatDateString = dateString => {
    if (!dateString) return '--'
    return new Date(dateString).toLocaleDateString()
  }


const convertDate = unixStamp => {
  const date = moment.utc(unixStamp).format("MM/DD/YYYY");

  if (unixStamp === 'null') {return '--'}
  else if(unixStamp === null) {return '--'}
  else if(unixStamp === undefined) {return '--'}
  else {return date}
}



  
export default function SpudDateCard() {
    let classes = useStyles();
    const [stateApp, setStateApp] = useContext(AppContext)

    return (
      <div className={classes.iconContainer}>

      <RigIcon htmlColor='black' viewBox="65.8 0 481.7 792" fontSize="large" />

      <Typography
        //classes={classes.text1}
        align="center"
        variant="subtitle2"
      >
        Spud Date
      </Typography>
      <Typography
        align="center"
        //className={classes.text2}
        variant="caption"
      >
      {convertDate(stateApp.selectedWell.spudDate)}

      </Typography>
      </div>


    );
  };