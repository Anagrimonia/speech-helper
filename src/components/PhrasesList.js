import React from 'react';
import '../App.css';

import { connect } from "react-redux";

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { 
  addTheme,
  addPhrase,
  deleteTheme,
  deletePhrase
 } from "../actions";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapDispatchToProps = dispatch => ({
  addTheme: (data) => dispatch(addTheme(data)),
  addPhrase: (data) => dispatch(addPhrase(data)),
  deleteTheme: (data) => dispatch(deleteTheme(data)),
  deletePhrase: (data) => dispatch(deletePhrase(data)),
})

const mapStateToProps = state => ({
  themes: state.themes,
  user: state.user,
  edit: state.edit
});

// -------===== THEMES MENU =====-------

function TextAdder(props) {
  
    const {callback, classes} = props;
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');

    const handleChange = (event) => {
      setText(event.target.value);
    };

    const handleOpen = () => {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = (event) => {
      callback(text);
      setOpen(false);
    }

    return (
      <div className={classes}>
        <Tooltip 
          title="Add" aria-label="add"
          onClick={handleOpen}>
          <AddIcon size='small' color='action'/>
        </Tooltip>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Добавить</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              value={text}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Отменить
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function PhrasesList(props) {
  const classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      '& > :nth-child(n+2) > :nth-child(1)': { padding: '5px' }
    },
    phrase: {
      margin: 5,
    },
    addTheme: {
      padding: '11px 11px 0 11px',
    },
    addPhrase: {
      verticalAlign: 'middle',
      marginRight: '5px',
    }
  }))();

  const {themes, addText, user, edit, addTheme, addPhrase, deletePhrase, deleteTheme} = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    addText(event.currentTarget.textContent);
  }

  const handleAddTheme = (theme) => {
    addTheme({theme: theme})
  }

  const handleAddPhrase = (phrase) => {
    addPhrase({theme: Object.keys(themes)[value], phrase: phrase})
  }

  const handleDeleteTheme = () => {
    deleteTheme({theme: Object.keys(themes)[value]})
  }

  const handleDeletePhrase = (phrase) => () => {
    console.log(phrase);
    deletePhrase({theme: Object.keys(themes)[value], phrase: phrase})
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >

          {Object.keys(themes).map((key, val) => (
            <Tab label={key} value={val} {...a11yProps(val)} />
          ))}

          { edit ?
            <TextAdder 
              classes={classes.addTheme}
              callback={handleAddTheme}
            />
          : null }

        </Tabs>
      </AppBar>

      {Object.keys(themes).map((key, id) => (
        <TabPanel label={key} value={value} index={id}>
          {Object.values(themes)[id].map((phrase, val) => (
            <Chip
              className={classes.phrase}
              value={val}
              label={phrase}
              onClick={handleClick}
              onDelete={edit ? handleDeletePhrase(phrase) : null}
              variant="outlined"
            />
          ))}

          { edit ?
            <div style={{display: 'flex', margin: '6px'}}>
              <TextAdder classes={classes.addPhrase}
                         callback={handleAddPhrase}/>
              <Button 
                onClick={handleDeleteTheme}
                style={{ flexGrow: '1', height: '26px'}} 
                size='small' variant="outlined" color='primary'>
              Удалить тему
              </Button>
            </div>
          : null }
    
        </TabPanel>
      ))}

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PhrasesList);
