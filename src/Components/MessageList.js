import React, { Component } from 'react';
import './MessageList.css'
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

    var timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

    this.messagesRef.push({
      username: this.props.user ? this.props.user.displayName : "Guest",
      content: this.state.newMessage,
      sentAt: timestamp,
      roomID: this.props.activeRoom.key
    });
    this.setState({ newMessage: "" })
  }

  editMessage(messageKey) {

  }

  deleteMessage(messageKey) {
    var filtered = this.state.messages.filter( message => {
      return message.key !== messageKey;
    })
    this.setState({ messages: filtered });

    this.messagesRef.child(messageKey).remove();
  }

  render() {
    return (
      <section className="messages-list">
        <h1>Messages</h1>
        <h1> {this.props.activeRoom ? this.props.activeRoom.name : "Pick a Room"}</h1>
        <section className="messages">
          {
            this.state.messages.filter(message => message.roomID === this.props.activeRoom.key).map( message => (
              <ul className="message-contents" key={message.key}>
                <li id="message-user">{message.username}:</li>
                <li id="message-content">{message.content}</li>
                <li id="timestamp">
                  <span>({message.sentAt})            </span>
                  <span className="edit-button">
                    <button id="edit-message-button" onClick={ () => this.editMessage(message.key) }>Edit</button>     </span>
                  <span className="delete-button">
                    <button id="delete-message-button" onClick={ () => window.confirm("Are you sure you want to delete this room?") ? this.deleteMessage(message.key) : null }>Delete</button>
                  </span>
                </li>
              </ul>
            ))
          }
        </section>
        <form id="create-new-message" onSubmit={ (e) => this.sendMessage(e) }>
          <textarea
          cols="100"
          row="1"
          onChange={ (e) => this.handleChange(e) }
          value={ this.state.newMessage }
          placeholder="New message text here..."></textarea>
          <p><button type="submit">Send</button></p>
        </form>
      </section>
    )
  }
}


export default MessageList;
