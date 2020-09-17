import React from 'react';
import '../App.css';

import { connect } from "react-redux";
import { registerUser, loginUser } from "../actions";

// ---

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
  loginUser: user => dispatch(loginUser(user))
})

// ------===== LOGIN BUTTON & FORM =====-------

function AuthForm(props) {
  const classes = makeStyles((theme) => ({
    root: {
      left: '5px',
      height: '30px',
      margin: '3px'
    },
    clickable: {
      fontSize: 'small',
      "&:hover": {
        color: "black",
        cursor: 'pointer',
      },
    }
  }))();

  const {registerUser, loginUser} = props;

  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [isNew, setIsNew] = React.useState(false);

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAuthMode = () => {
    setIsNew(!isNew);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isValid = () => {
    return (login && password && (!isNew || password === passwordConfirm));
  }

  const handleSubmit = () => {
    if (isValid()) {
      var user = {login: login, password: password};

      if (isNew) 
        registerUser(user);
      else 
        loginUser(user);
    }
    handleClose();
  };

  return (
    <div>
      <Button className={classes.root} variant="outlined" color="secondary" onClick={handleClickOpen}>
        ВОЙТИ
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы добавлять и редактировать список готовых фраз, авторизуйтесь в системе.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Логин"
            type="login"
            value={login}
            onChange={handleChangeLogin}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Пароль"
            type="password"
            value={password}
            onChange={handleChangePassword}
            fullWidth
          />

          { isNew ?

          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Подтвердите пароль"
              type="password"
              value={passwordConfirm}
              onChange={handleChangePasswordConfirm}
              fullWidth
            /> 

          : null }
          <DialogContentText className={classes.clickable} onClick={handleAuthMode}>
           { isNew ? 'Уже есть аккаунт?' : 'Зарегистрироваться' }
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
          <Button onClick={handleSubmit} color="primary">
            { isNew ? 'Зарегистрироваться' : 'Войти' }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(AuthForm);