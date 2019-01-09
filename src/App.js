import React, { Component } from 'react';
import './App.css';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import User from './Components/User'
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
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      user: ""
    };
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ user: user })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Bloc Chat App</header>
        <section className="flex-container">
          <section className="flex-item">
            <section id="room-list">
              <RoomList
              firebase={ firebase }
              activeRoom={ this.state.activeRoom }
              setActiveRoom={ (room) => this.setActiveRoom(room)}
              user={ this.state.user }
              />
            </section>
          </section>
          <section className="flex-item">
            <section id="message-list">
              <MessageList
              firebase={ firebase }
              activeRoom={ this.state.activeRoom }
              user={ this.state.user }/>
            </section>
          </section>
          <section className="flex-item">
            <section id="users">
              <User
              firebase={ firebase }
              user={ this.state.user }
              setUser={ (user) => this.setUser(user) }/>
            </section>
          </section>
        </section>
      </div>
    );
  }
}

export default App;
