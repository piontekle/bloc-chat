import React, { Component } from 'react';
import './../App.css'

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
    return (
      <section className="messages-list">
        <h1>Messages</h1>
        <h2> {this.props.activeRoom ? this.props.activeRoom.name : "Pick a Room:"}</h2>
        {
          this.state.messages.filter(message => message.roomID === this.props.activeRoom.key).map( message => (
            <ul className="message-content" key={message.key}>
              <li> {message.username}: {message.content}</li>
              <li id="timestamp">({message.sentAt})</li>
            </ul>
          ))
        }
      </section>
    )
  }
}


export default MessageList;
