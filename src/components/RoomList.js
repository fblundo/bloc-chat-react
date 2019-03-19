import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rooms: [],
      newRoomName: ''
    }
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
      if (this.state.rooms.length === 1) { this.props.setActiveRoom(room) }
    });
  }

  handleChange(e) {
    this.setState({newRoomName: e.target.value });  //take the room name typed into the input form and use it to setState of newRoomName
  }

  createRoom(newRoomName) {
    this.roomsRef.push({ //use the .push() method on a Firebase reference to add an item to that location, we are saving data on the Firebase database
      name: newRoomName
    });
    this.setState({ newRoomName: '' });
  }

  handleSubmit(e) {
    e.preventDefault(); //it prevents to submit the form (as if it was refreshing the page in the default way; we don't need it, being this React)
    this.createRoom(this.state.newRoomName);
  }

  render() {
    return (
      <section className="room-list">
      <form id="create-room" onSubmit={(e) => {this.handleSubmit(e)}}>
        <input type="text"
        className="btn btn-light"
        value={this.state.newRoomName}
        onChange={(e) => this.handleChange(e)}
        name="newRoomName"
        placeholder="New Room" />
        <input type="submit" value="+" className="btn btn-primary"/>
      </form>

      <br></br>
      {this.state.rooms.map(room =>
        <ul className="text-left" key={room.key}>
          <li>
            {/*//by cliking on the link, i set the selected room as the active room in the state of App.js */}
            <button className="room-name" className="btn btn-link" onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</button>
          </li>
      </ul>
      )}
      </section>
      // {this.state.rooms.map( room =>
      // <div key={room.key}> {room.name} </div>
      // )}
    );
  }
}

export default RoomList;
