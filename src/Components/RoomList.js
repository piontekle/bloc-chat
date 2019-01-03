import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
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

  render() {
    return (
      <section className="room-list">
        <h1>Bloc Chat Rooms</h1>
        {
          this.state.rooms.map ( (roomName, index) =>
            <p className="room-name" key={index}>{roomName.name}</p>
          )
        }
      </section>
    );
  }
}

export default RoomList;
