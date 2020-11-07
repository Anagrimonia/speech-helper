import React from 'react';
import '../App.css';
import AuthForm from "./AuthForm";

import { connect } from "react-redux";
import { purple } from '@material-ui/core/colors';
import { getThemes, setEdit, unloginUser } from "../actions";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const mapDispatchToProps = dispatch => ({
  getThemes: () => dispatch(getThemes()),
  setEdit: (edit) => dispatch(setEdit(edit)),
  unloginUser: () => dispatch(unloginUser())
})

const mapStateToProps = state => ({
  user: state.user,
  edit: state.edit
});

function Header(props) {

  const classes = makeStyles((theme) => ({
    root: {
      '& > *': {
        height: '30px',
        margin: '3px',
        display: 'inline-flex',
      },
    },
    login: {
      color: 'white',
      padding: '0 10px',
    },
    white: {
      float: 'right',
      marginRight: '15px',
      color: '#aaa',
      '& > :nth-child(2)': {
         marginLeft: '5px',
       }
    } 
  }))();

  const {user, getThemes, edit, setEdit, unloginUser} = props;

  const handleCheck = (event) => {
    setEdit(!edit);
  }

  const handleClickUnlogin = (event) => {
    unloginUser();
    console.log(edit);
  }

  return (
    <div className='header'>
      { !user 
        ? 
        <AuthForm /> 
        : 
        <div className={classes.root}>
          <p className={classes.login}>{user}</p>
          <FormControlLabel
            className={classes.white}
            control={
              <Switch
                size='small'
                checked={edit} 
                color="secondary"
                onChange={handleCheck}
              />
            }
            label="Ред."
          />
          <Button variant="outlined" color="secondary" onClick={handleClickUnlogin}>
            ВЫЙТИ ИЗ АККАУНТА
          </Button>
        </div>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
