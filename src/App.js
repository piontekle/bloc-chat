import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC0M0EEqG324kJM4aB85LEkWUD6mB5HYqA",
    authDomain: "bloc-chat-1992.firebaseapp.com",
    databaseURL: "https://bloc-chat-1992.firebaseio.com",
    projectId: "bloc-chat-1992",
    storageBucket: "bloc-chat-1992.appspot.com",
    messagingSenderId: "906410482616"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
