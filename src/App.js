import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'; //importing the component
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <RoomList firebase={firebase}  name={this.name} />
        </header>
      </div>
    );
  }
}

export default App;
