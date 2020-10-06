import React from 'react';

import PhrasesList from "./PhrasesList";
import Input from "./Input";

import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import MicIcon from '@material-ui/icons/Mic';
import Artyom from 'artyom.js';

// ------

const Jarvis = new Artyom('ru-RU');
Jarvis.initialize({
    lang: "ru-RU",
    soundex: true, // Use the soundex algorithm to increase accuracy
    debug: true,   // Show messages in the console
}).then(() => {
    console.log("Artyom has been succesfully initialized");
}).catch((err) => {
    console.error("Artyom couldn't be initialized: ", err);
});

function VoiceButton(props) {

  const {text, setText} = props;

  const classes = makeStyles((theme) => ({
    root: {
      display: 'block',
      margin: '0 auto',
    },
    div: {
      position: 'sticky',
      bottom: '0px',
      backgroundColor: '#fff',
      padding: '10px 0'
    }
  }))();

  const handleClick = (event) => {
    Jarvis.say(text);
  }

  return (
    <div className={classes.div}>
      <MicIcon 
        className={classes.root}
        onClick={handleClick}
        fontSize='large' 
        color='action'
      />
    </div>
  )
}

function Context(props) {

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
      <Input text={text} setText={setText} />
      <VoiceButton text={text} />
    </div>
  );
}

export default connect(null, null)(Context);
