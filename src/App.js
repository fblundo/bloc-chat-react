import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'; //importing the component
import MessageList from './components/MessageList'; //importing the component
import User from './components/User'; //importing the component

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
      user: null
    };
  }

setActiveRoom(room) {
   this.setState({activeRoom: room});
 }

 setUser(user) {
    this.setState({user: user});
  }

render() {
    return (
      <div className="App">
      <header className="App-header">

        <div className="container">
          <div className="row">
            <div className="col-4">
              <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)} user={this.state.user} />
            </div>
            <div  className="col">
              <User firebase={firebase}
                    user={this.state.user}
                    setUser={() => this.setUser()}
               />
              <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
            </div>
          </div>
        </div>
      </header>
      </div>
    );
  }
}

export default App;
