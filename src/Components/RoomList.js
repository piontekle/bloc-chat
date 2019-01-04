import React, { Component } from 'react';
import './../App.css'

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    this.setState( {newRoomName: e.target.value })
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {return}
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: "" })
  }

  render() {
    return (
      <section className="chat-room-box">
        <h1>Chat Rooms</h1>
          <ul className="room-list">
            {
              this.state.rooms.map ( (room, index) =>
                <li
                id="room-name"
                className={room.name === this.props.activeRoom.name ? "highlight" : null}
                key={index}
                onClick={() => this.props.setActiveRoom(room) }>
                {room.name}
                </li>
              )
              }
            </ul>
          <section className="new-room-form">
            <form id="create-new-room" onSubmit={ (e) => this.createRoom(e) }>
              <input
              type="text"
              value={ this.state.newRoomName }
              onChange = { (e) => this.handleChange(e) }
              placeholder="New room name..."/>
              <input type="submit" value="Create New Room"/>
            </form>
          </section>
        </section>
    );
  }
}

export default RoomList;
