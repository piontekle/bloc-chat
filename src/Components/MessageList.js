import React, { Component } from 'react';
import './MessageList.css'
import './../App.css'

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: "",
      messageUpdating: "",
      editMessage: ""
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

  onEnterPress(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.sendMessage(e)
    }
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

  handleEditClick(messageKey) {
    this.setState({
      messageUpdating: messageKey
    })
  }

  handleEdit(edit) {
    this.setState({ editMessage: edit.target.value })
  }

  editMessage(e) {
    e.preventDefault();
    if (!this.state.editMessage) {return}

    this.state.messages.forEach( message => {
      if (message.key === this.state.messageUpdating) {
        message.content = this.state.editMessage;
      }
    })

    this.messagesRef.child(this.state.messageUpdating).update({ "content": this.state.editMessage })
    this.setState({
      messageUpdating: "",
      editMessage: ""
    })
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
                {
                  this.state.messageUpdating === message.key ?
                  <form className="edit-message-form" onSubmit={(e) => this.editMessage(e)}>
                    <input type="text"
                    value={ this.state.editMessage }
                    onChange={(e) => this.handleEdit(e)}
                    placeholder={message.content}/>
                    <input type="submit" value="Update Message"/>
                  </form> :
                <li id="message-content">{message.content}</li>
                }
                <li id="timestamp">
                  <span>{message.sentAt}            </span>
                  <span className="edit-button">
                    <button id="edit-message-button" onClick={ () => this.handleEditClick(message.key) }>Edit</button>     </span>
                  <span className="delete-button">
                    <button id="delete-message-button" onClick={ () => window.confirm("Are you sure you want to delete this message?") ? this.deleteMessage(message.key) : null }>Delete</button>
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
          onKeyDown={ (e) => this.onEnterPress(e) }
          value={ this.state.newMessage }
          placeholder="New message text here..."></textarea>
          <p><input type="submit" value="Send"/></p>
        </form>
      </section>
    )
  }
}


export default MessageList;
