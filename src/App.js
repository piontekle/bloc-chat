import React, { Component } from 'react';
import './App.css';
import RoomList from './Components/RoomList';
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
        <header className="App-header">Bloc Chat App</header>
        <section id="RoomList">
          <RoomList firebase={firebase} />
        </section>
      </div>
    );
  }
}

export default App;
