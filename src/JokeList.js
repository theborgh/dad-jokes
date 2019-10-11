import React from 'react';
import './JokeList.css';
import axios from 'axios';

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    let jokes = [];

    // how to use defaultProps
    while (jokes.length < this.props.numJokesToGet) {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json',
        },
      });

      jokes.push(response.data.joke);
    }

    console.log(jokes);

    this.setState({
      jokes,
    });
  }

  render() {
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
          <h1 className='JokeList-title'>
            <span>Dad</span> jokes
          </h1>
          <img
            src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
            alt=''
          />
          <button className='JokeList-getmore'>New Jokes</button>
        </div>
        <div className='JokeList-jokes'>
          {this.state.jokes.map(joke => (
            <div> {joke}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
