import React from 'react';
import './Joke.css';

class Joke extends React.Component {
  render() {
    return (
      <div className='Joke'>
        <div className='Joke-buttons'>
          <i className='fas fa-arrow-up' onClick={this.props.upvote}></i>
          <span>{this.props.votes}</span>
          <i className='fas fa-arrow-down' onClick={this.props.downvote}></i>
        </div>
        <div className='Joke-text'>{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
