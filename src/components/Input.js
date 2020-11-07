import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


// -------===== INPUT =====-------

function Input(props) {
  const classes = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%', 
      margin: '0',
      '& > *': {  
      fontSize: '1.4rem',
      margin: '0 10px',
      }
    },
  },
  }))();

  const {text, setText} = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleClear = (event) => {
    setText('');
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="standard-multiline-flexible"
        multiline
        size="small" 
        onChange={handleChange}
        value={text}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton size="small" variant="outlined" onClick={handleClear}>
                <HighlightOffIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default Input;
