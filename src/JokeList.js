import React from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends React.Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);

    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false,
      firstLoad: true,
    };

    this.seenJokes = new Set(this.state.jokes.map(joke => joke.text));

    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.state.firstLoad) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      let newJokes = [];

      while (newJokes.length < this.props.numJokesToGet) {
        const response = await axios.get('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'application/json',
          },
        });

        let newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          newJokes.push({id: uuid(), text: newJoke, votes: 0});
        }
      }

      this.setState(
        st => ({
          jokes: [...st.jokes, ...newJokes],
          loading: false,
          firstLoad: false,
        }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (err) {
      alert(err);
      this.setState({loading: false});
    }
  }

  handleClick() {
    this.setState({loading: true}, this.getJokes);
  }

  handleVote(id, change) {
    this.setState(
      st => ({
        jokes: st.jokes.map(joke =>
          joke.id === id ? {...joke, votes: joke.votes + change} : joke
        ),
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    ); // runs AFTER the setState
  }

  handleDelete() {
    this.setState({jokes: []});
    window.localStorage.clear();
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='JokeList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin'></i>
          <h1 className='JokeList-title'>Fetching Bad Jokes...</h1>
        </div>
      );
    }

    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

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
          <button className='JokeList-getmore' onClick={this.handleClick}>
            More Jokes!
          </button>
          <button className='JokeList-delete' onClick={this.handleDelete}>
            These are all terrible!{' '}
            <span className='Jokelist-delete-span'>DELETE!</span>
          </button>
        </div>
        <div className='JokeList-jokes'>
          {!this.state.firstLoad && !jokes.length ? (
            <h1 className='JokeList-morejokesprompt'>
              Click More Jokes! when you're mentally ready...
            </h1>
          ) : (
            jokes.map(joke => (
              <Joke
                key={joke.id}
                votes={joke.votes}
                text={joke.text}
                upvote={() => this.handleVote(joke.id, 1)}
                downvote={() => this.handleVote(joke.id, -1)}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default JokeList;
