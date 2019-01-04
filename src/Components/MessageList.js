import React, { Component } from 'react';
import './../App.css'

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: "",
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

  handleChange(e) {
    this.setState({ newMessage: e.target.value })
  }

  sendMessage(e) {
    e.preventDefault();
    if (!this.props.activeRoom) {return}
    if (!this.state.newMessage) {return}
    this.messagesRef.push({
      username: this.props.user ? this.props.user.displayName : "Guest",
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.activeRoom.key
    });
    this.setState({ newMessage: "" })
  }

  render() {
    return (
      <section className="messages-list">
        <h1>Messages</h1>
        <h2> {this.props.activeRoom ? this.props.activeRoom.name : "Pick a Room:"}</h2>
        {
          this.state.messages.filter(message => message.roomID === this.props.activeRoom.key).map( message => (
            <ul className="message-content" key={message.key}>
              <li id="message-user">{message.username}:</li>
              <li id="message-content">{message.content}</li>
              <li id="timestamp">({message.sentAt})</li>
            </ul>
          ))
        }
        <form id="create-new-message" onSubmit={ (e) => this.sendMessage(e) }>
          <textarea
          cols="100"
          row="1"
          onChange={ (e) => this.handleChange(e) }
          value={ this.state.newMessage }
          placeholder="New message text here..."></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    )
  }
}


export default MessageList;
