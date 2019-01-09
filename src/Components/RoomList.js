import React, { Component } from 'react';
import './RoomList.css';
import './../App.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
      editName: ""
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
    this.setState({ newRoomName: "" });
  }

  handleEdit(roomKey) {
    const edit = prompt("Please enter new room name:")

    if (edit === "" || edit === null) {
      return;
    } else {
      this.setState({ editName: edit });
      console.log(this.state.editName)
      this.editRoom(roomKey);
    }
  }

  editRoom(roomKey) {
    this.roomsRef.child(roomKey).update({ "name" : this.state.editName })
    this.setState({ editName: "" })
  }

  deleteRoom(roomKey) {
    var filteredRooms = this.state.rooms.filter( room => {
      return room.key !== roomKey;
    })
    this.setState({ rooms: filteredRooms });

    this.roomsRef.child(roomKey).remove();
  }

  render() {
    return (
      <section className="chat-room-box">
        <h1>Chat Rooms</h1>
          <ul className="room-list">
            {
              this.state.rooms.map ( (room, index) =>
                  <li>
                    <span
                      id="room-name"
                      className={room.name === this.props.activeRoom.name ? "highlight" : null}
                      key={room.key}
                      onClick={() => this.props.setActiveRoom(room) }>
                      {room.name}            </span>
                      <span className="edit-button">
                        <button id="edit-room-button" onClick={ () => this.handleEdit(room.key) }>Edit</button>      </span>
                    <span className="delete-button">
                      <button id="delete-room-button" onClick = { () => window.confirm("Are you sure you want to delete this room?") ? this.deleteRoom(room.key) : null }>Delete</button>
                    </span>
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
