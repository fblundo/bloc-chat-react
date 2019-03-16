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
    this.messagesRef.on('child_added', snapshot  => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messageList: this.state.messageList.concat(message) }, () => {
        this.showMessages( this.props.activeRoom )
      });
    });
  }

  componentWillReceiveProps(nextProps) { //https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    this.showMessages( nextProps.activeRoom );
  }

  handleChange(e) {
    this.setState({newMessage: e.target.value} );  //take the room name typed into the input form and use it to setState of newRoomName
  }

  showMessages(activeRoom) {
    this.setState({ displayedMessages: this.state.messageList.filter(message => message.roomId === activeRoom.key)});
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
        </li>
      )}
      </ul>
      </main>
    );
  }
}

export default MessageList;
