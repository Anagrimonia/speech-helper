import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import PhrasesList from "./components/PhrasesList";


// ------

import { makeStyles } from '@material-ui/core/styles';

import thunk from 'redux-thunk';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from 'redux';

import rootReducer from "./reducers";

// ------

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import Artyom from 'artyom.js';

const Jarvis = new Artyom('ru-RU');
Jarvis.initialize({
    lang: "ru-RU",
    soundex: true,// Use the soundex algorithm to increase accuracy
    debug: true, // Show messages in the console
}).then(() => {
    console.log("Artyom has been succesfully initialized");
}).catch((err) => {
    console.error("Artyom couldn't be initialized: ", err);
});

const store = createStore(rootReducer, applyMiddleware(thunk));


// -------===== INPUT =====-------

function Input(props) {
  const classes = makeStyles((theme) => ({
  root: {
    //height: '200px',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%', 
      margin: '0',
      //height: '200px',
      '& > *': {  
      fontSize: '1.4rem',
      margin: '0 10px',
      //height: '200px',
      '& > *': {
        //height: '200px !important',
        //overflow: 'visible !important'
      }
      }
    },
  },
  }))();

  const {text, setText} = props;

  const handleChange = (event) => {
    setText(event.target.value);
    Jarvis.say(text);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="standard-multiline-flexible"
        multiline
        size="small" 
        onChange={handleChange}
        value={text}
      />
    </form>
  );
}

function PredictorList(props) {

  const classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    'list': {
      '& > *': {
        minHeight: '0',
        margin: '5px'
      }
    },
    chip: {
      margin: '3px'
    }
  }))();

  const {predictions, addText} = props;

  const handleClick = (event) => {
    addText(event.currentTarget.textContent);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.list} position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >

          {['один', 'два', 'три', 'xtnsht'].map((key, val) => (
            <Chip 
            className={classes.chip} 
            onClick={handleClick} 
            label={key} 
            value={val} />
          ))}

        </Tabs>
      </AppBar>
    </div>
  );

}

function Context() {

  const classes = makeStyles((theme) => ({
    root: {
      //display: 'flex',
      //flexDirection: 'column',
      //height: 'calc(100vh - 50px)',
    },
  }))();

  const addText = (phrase) => {
    if (text)
      setText(text + ' ' + phrase.toLowerCase());
    else
      setText(phrase)
  };

  const [text, setText] = React.useState('');

  return (
    <div className={classes.root}>
      <PhrasesList addText={addText} />
      <PredictorList addText={addText} />
      <Input text={text} setText={setText} />
    </div>
  );
}

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Context />
      </div>
    </Provider>
  );
}

export default App;
