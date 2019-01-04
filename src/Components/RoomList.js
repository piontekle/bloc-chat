import React, { Component } from 'react';

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
    this.setState( { newRoomName: "" })
  }

  render() {
    return (
      <section className="room-list">
        <h1>Bloc Chat Rooms</h1>
        {
          this.state.rooms.map ( (roomName, index) =>
            <p className="room-name" key={index}>{roomName.name}</p>
          )
        }
        <section className="new-room-form">
          <form id="create-new-room" onSubmit={ (e) => this.createRoom(e) }>
            <input type="text" value={ this.state.newRoomName } onChange = { (e) => this.handleChange(e) } placeholder="Create New Room..."/>
            <input type="submit" value="Submit"/>
          </form>
        </section>
      </section>
    );
  }
}

export default RoomList;
