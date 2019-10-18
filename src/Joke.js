import React from 'react';
import './Joke.css';

class Joke extends React.Component {
  constructor(props) {
    super(props);

    this.getColorAndEmoji = this.getColorAndEmoji.bind(this);
  }

  getColorAndEmoji() {
    if (this.props.votes >= 10) {
      return {color: '#4caf50', emoji: 'em em-rolling_on_the_floor_laughing'};
    } else if (this.props.votes >= 7) {
      return {color: '#8bc34a', emoji: 'em em-laughing'};
    } else if (this.props.votes >= 4) {
      return {color: '#cddc39', emoji: 'em em-smiley'};
    } else if (this.props.votes >= 1) {
      return {color: '#ffeb3b', emoji: 'em em-slightly_smiling_face'};
    } else if (this.props.votes >= 0) {
      return {color: '#ffc107', emoji: 'em em-neutral_face'};
    } else if (this.props.votes >= -1) {
      return {color: '#ff9800', emoji: 'em em-confused'};
    } else {
      return {color: '#f44336', emoji: 'em em-angry'};
    }
  }

  render() {
    return (
      <div className='Joke'>
        <div className='Joke-buttons'>
          <i className='fas fa-arrow-up' onClick={this.props.upvote}></i>
          <span
            className='Joke-votes'
            style={{borderColor: this.getColorAndEmoji().color}}
          >
            {this.props.votes}
          </span>
          <i className='fas fa-arrow-down' onClick={this.props.downvote}></i>
        </div>
        <div className='Joke-text'>{this.props.text}</div>
        <div className='Joke-smiley'>
          <i className={this.getColorAndEmoji().emoji} />
        </div>
      </div>
    );
  }
}

export default Joke;
