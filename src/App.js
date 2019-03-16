import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'; //importing the component
import MessageList from './components/MessageList'; //importing the component
import './App.css';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfQbekmSDdTxv9b80tGP0toGXQ912eof0",
    authDomain: "my-project-1547733005314.firebaseapp.com",
    databaseURL: "https://my-project-1547733005314.firebaseio.com",
    projectId: "my-project-1547733005314",
    storageBucket: "my-project-1547733005314.appspot.com",
    messagingSenderId: "542568497244"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: null,
    };
  }

  setActiveRoom(room) {
   this.setState({activeRoom: room});
 }

  render() {
    return (
      <div className="App">
      <header className="App-header">

        <div class="container">
          <div class="row">
            <div className="col-4">
              <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} />
            </div>
            <div  className="col">
              <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
            </div>
          </div>
        </div>
      </header>
      </div>
    );
  }
}

export default App;
