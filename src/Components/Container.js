import React, { Component, Fragment } from 'react';
import './../Styles/Container.css';

import CellRow from './CellRow';
import { Status } from './Status';
import * as Constants from './../Utils/Constants';
import * as Helpers from './../Utils/Helpers';
import * as StateHelpers from './../Utils/StateHelpers';
import Modal from './Modal';
import swipe from './../Assets/Sounds/swipe.mp3'

class Container extends Component {
  state = null;
  xDown = null;                                                        
  yDown = null;   
  componentWillMount() {
    this.setInitialState();
  }
  componentDidMount() {
    this.sound.volume = '0.1';
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
  }
  setInitialState = () => {
    const randomImage = Helpers.getRandomNumber({ min: 0, max: 3 });
    this.setState({
      tiles : Array(Constants.GridSize).fill(null).map(_ => Helpers.getRandomRow()),
      status: Constants.Status.START[randomImage],
      hightestValueTile: Constants.HighestStartingTile,
      modal: {won: false, lost: false}
    });
    document.addEventListener('keydown', this.handleKeyDown, false);

    // For mobile users
    document.addEventListener('touchstart', this.handleTouchStart, false);        
    document.addEventListener('touchmove', this.handleTouchMove, false);
  }                                                  
 
  handleTouchStart = (evt) => {                                         
      this.xDown = evt.touches[0].clientX;                                      
      this.yDown = evt.touches[0].clientY;                                      
  };                                                
  
  handleTouchMove = (evt) => {
    evt.preventDefault();
    if (!this.xDown || !this.yDown) {
        return;
    }

    const direction = Helpers.getSwipeDirection(evt.touches[0], this.xDown, this.yDown);
    if (direction) {
      this.handleKeyDown({key: direction});
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;                                             
  };

  handleKeyDown = (event) => {
    const {tiles, score} = StateHelpers.getAlteredTiles(this.state.tiles, event.key);
    this.setState({
      ...this.state,
      tiles,
    });
    this.props.updateScore(score);
    this.checkStatus();
    this.sound.play();
  }

  // checking tiles status to output the status image  
  checkStatus = () => {
    const tiles = this.state.tiles.reduce((accumulator, currentRow) => accumulator.concat(currentRow));
    const hightestValueTile = Math.max(...tiles);
    const {status, lost, won} = StateHelpers.getStatus(this.state.status, tiles, hightestValueTile, this.state.hightestValueTile);
    this.setState({
      ...this.state,
      status,
      modal: {lost, won},
      hightestValueTile
    });
    if (lost) {
      this.componentWillUnmount();
    } 
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      modal : {lost: false, won: false}
    });
  }

  render() {
    const { tiles, status, modal } = this.state;
    return (
      <Fragment>
        <audio ref={(input) => {this.sound = input}} volume="0.01" src={swipe} />
        {(modal.won || modal.lost) ? '' : <Status name={status} />}
        <div className="Container">
          {tiles.map((row, rowIndex) => <CellRow row={row} index={rowIndex} key={rowIndex} />)}
        </div>
        <Modal status={status} won={modal.won} lost={modal.lost} handleClose={this.handleClose} setInitialState={this.setInitialState}/>
      </Fragment>
    );
  }
}

export default Container;