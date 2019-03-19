import React, { Component } from 'react';

class MessageList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messageList: [],
      displayedMessages: [],
      newMessage: ''
    }
    this.messagesRef = this.props.firebase.database().ref('messages')
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot  => { //Retrieve lists of items or listen for additions to a list of items.
      //This event is triggered once for each existing child and then again every time a new child is added to the specified
      //path. The listener is passed a snapshot containing the new child's data.
      const message = snapshot.val();
      message.key = snapshot.key; //When rendering an array in React, each item should have a unique "key" prop, and the snapshot's key is ideal for that purpose.
      this.setState({messageList: this.state.messageList.concat(message) }, () => {
      this.showMessages( this.props.activeRoom ) // I show the messages filtered based on the ActiveRoom, which I get as props from App.js state
      });
    });
    this.messagesRef.on('child_removed', snapshot  => {
      this.setState({ messageList: this.state.messageList.filter( message => message.key !== snapshot.key )  }, () => {
        this.showMessages( this.props.activeRoom )
      });
    });
  }

  // to be updated
  componentWillReceiveProps(nextProps) { //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    this.showMessages( nextProps.activeRoom ); //I update the list of messages, keeping the Active Room as reference
  }

  handleChange(e) {
    this.setState({newMessage: e.target.value} );  //take the room name typed into the input form and use it to setState of newRoomName
  }

  showMessages(activeRoom) {
    this.setState({ displayedMessages: this.state.messageList.filter(message => message.roomId === activeRoom.key)}); //filtering those messages which
    //have same roomId as the active Room.key passed from RoomList component.
  }

  createMessage(newMessage) {
    this.messagesRef.push({ //use the .push() method on a Firebase reference to add an item to that location, we are saving data on the Firebase database
      username: this.props.user ? this.props.user.displayName : 'Guest',
      content: newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key,
    });
    this.setState({ newMessage: '' });
  }

  removeMessage(activeRoom) {
    this.messagesRef.child(activeRoom.key).remove();
  }

  handleSubmit(e) {
    e.preventDefault(); //it prevents to submit the form (as if it was refreshing the page in the default way; we don't need it, being this React)
    this.createMessage(this.state.newMessage);
  }

  render() {
    return (
      <main id="messages-component">
      <h2 className="room-name">{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
      <ul id="message-list">
      {this.state.displayedMessages.map(message =>
        <li key={message.key}>
          <div className="username">
          { message.username }
          </div>
          <div className="content">
          { message.content }
          </div>
          <div className="time">
          { message.sentAt }
          </div>
          <input type="button" className="btn-remove-msg" onClick={() => this.removeMessage(message)} />
        </li>
      )}
      </ul>

      <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage) } }>
        <input type="text"
          value={ this.state.newMessage }
          onChange={ this.handleChange.bind(this) }
          name="newMessageText"
          placeholder="Write your message here..." />
        <input type="submit" value="Send"/>
      </form>
      </main>
    );
  }
}

export default MessageList;
