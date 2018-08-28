import React, { Component } from 'react';
import './App.css';
import Container from './Components/Container';
class App extends Component {
  container;
  restartGame = () => {
    this.container.setInitialState();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to 2048</h1>
          <p>Make use of arrow keys to play the game</p>     
          <button className="Restart" onClick={this.restartGame}>Restart game</button>      
        </header>
        <div className="App-container">
          <Container ref={(container) => this.container = container} />
        </div>
      </div>
    );
  }
}

export default App;
