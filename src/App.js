import React, { Component } from 'react';
import './App.css';
import Container from './Components/Container';
import Octocat from './Components/Octocat';

class App extends Component {
  container;
  constructor(props) {
    super(props);
    this.state = {totalScore: 0, currentScore: 0};
  }
  updateScore = (score) => {
    requestAnimationFrame( () => {this.setState({
      totalScore: this.state.totalScore + score,
      currentScore: score
    });})
  }
  restartGame = () => {
    this.container.setInitialState();
    this.setState({
      ...this.state,
      totalScore: 0
    });
  }
  getScore = (score) => {
    return (<span className="Incrementor">+{score}</span>);
  }
  render() {
    return (
      <div>
      <Octocat />
      <div className="App">
        <header className="App-header">
          <div className="Flex-container">
            <h1 className="App-title">2048</h1>
            <div className="Scoreboard">
              Score: {this.state.totalScore}
              {this.state.currentScore ? this.getScore(this.state.currentScore) : ''}
            </div>
          </div>

          <p>Make use of arrow keys or swipe to play the game</p>     
          <button className="Restart" onClick={this.restartGame}>Restart game</button>      
        </header>
        <div className="App-container">
          <Container ref={(container) => this.container = container} updateScore={this.updateScore}/>
        </div>
      </div>
      <footer>
        Made with <span role="img" aria-label="love">❤️</span> by Priyanka
      </footer>
      </div>
    );
  }
}

export default App;
