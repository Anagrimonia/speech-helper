import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import PhrasesList from "./components/PhrasesList";
import Context from "./components/Context";

// ------

import thunk from 'redux-thunk';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from 'redux';

import rootReducer from "./reducers";


const store = createStore(rootReducer, applyMiddleware(thunk));

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
