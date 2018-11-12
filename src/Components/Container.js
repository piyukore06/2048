import React, { Component, Fragment } from 'react';
import './../Styles/Container.css';

import FieldRow from './FieldRow';
import { Status } from './Status';
import * as Constants from './../Functions/Constants';
import * as Helpers from './../Functions/Helpers';

import HammerComponent from 'react-hammerjs';
class Container extends Component {
  state = null;
  componentWillMount() {
    this.setInitialState();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  setInitialState = () => {
    const randomImage = Helpers.getRandomNumber({ min: 0, max: 3 });this.setState({
      tiles : Array(Constants.GridSize).fill(null).map(_ => Helpers.getRandomRow()),
      status: Constants.Status.START[randomImage],
      hightestValueTile: Constants.HighestStartingTile
    });
    document.addEventListener('keydown', this.handleKeyDown);

    // For mobile users
    document.addEventListener('touchstart', this.handleTouchStart, false);        
    document.addEventListener('touchmove', this.handleTouchMove, false);
  }
  xDown = null;                                                        
  yDown = null;                                                        
  
  handleTouchStart = (evt) => {                                         
      this.xDown = evt.touches[0].clientX;                                      
      this.yDown = evt.touches[0].clientY;                                      
  };                                                
  
  handleTouchMove = (evt) => {
      if ( ! this.xDown || ! this.yDown ) {
          return;
      }
  
      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;
  
      var xDiff = this.xDown - xUp;
      var yDiff = this.yDown - yUp;
  
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
            console.log('left swipe')
            this.handleKeyDown({key: 'ArrowLeft'});
              /* left swipe */ 
          } else {
            console.log('right swipe')
            this.handleKeyDown({key: 'ArrowRight'});
              /* right swipe */
          }                       
      } else {
          if ( yDiff > 0 ) {
            console.log('up swipe')
            this.handleKeyDown({key: 'ArrowUp'});
              /* up swipe */ 
          } else { 
            console.log('down swipe')
            this.handleKeyDown({key: 'ArrowDown'});
              /* down swipe */
          }                                                                 
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;                                             
  };
  handleKeyDown = (event) => {
    const tiles = this.getAlteredTiles(event.key);
    this.setState({
      ...this.state,
      tiles
    });
    this.checkStatus();
  }

  // checking tiles status to output the status image  
  checkStatus = () => {
    const tiles = this.state.tiles.reduce((accumulator, currentRow) => accumulator.concat(currentRow));
    const hightestValueTile = Math.max(...tiles);
    const status = this.getStatus(tiles, hightestValueTile);
    this.setState({
      ...this.state,
      status,
      hightestValueTile
    });
  }
  getStatus = (tiles, hightestValueTile) => {
    const doesProgressMoveTileExist = Constants.ProgressMoveTiles.indexOf(hightestValueTile) !== -1;

    const doesWinningTileExist = tiles.filter(value => value === Constants.WinningTile).length;
    const doesAlmostWinningTileExist = tiles.filter(value => value === Constants.AlmostWinningTile).length;
    const doesZeroExist = tiles.filter(value => value === 0).length;
    const randomImage = Helpers.getRandomNumber({ min: 0, max: 3 });
    if (!doesZeroExist) {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('touchstart', this.handleTouchStart);        
      document.removeEventListener('touchmove', this.handleTouchMove);
      return Constants.Status.LOST[randomImage];
    } else if (doesProgressMoveTileExist && this.state.hightestValueTile !== hightestValueTile) {
      return randomImage === 3 ? null : Constants.Status.MOVE[randomImage];
    } else if (doesAlmostWinningTileExist) {
      return Constants.Status.ALMOST_WON[randomImage]
    } else if (doesWinningTileExist) {
      return Constants.Status.WON[randomImage]
    }
    return this.state.status;
  }
  getAlteredTiles = (key) => {
    let state;
    switch (key) {
      case 'ArrowDown':
        state = this.state.tiles
          .reduce(Helpers.transpose, [])
          .map(Helpers.reverseRow)
          .map(Helpers.alterRow);
        return Helpers.addRandomField(state)
          .map(Helpers.reverseRow)
          .reduce(Helpers.transpose, [])

      case 'ArrowUp':
        state = this.state.tiles
            .reduce(Helpers.transpose, [])
            .map(Helpers.alterRow);
        return Helpers.addRandomField(state)
            .reduce(Helpers.transpose, []);

      case 'ArrowRight':
        state = this.state.tiles
            .map(Helpers.reverseRow)
            .map(Helpers.alterRow);
        return Helpers.addRandomField(state)
            .map(Helpers.reverseRow)

      case 'ArrowLeft':
        state = this.state.tiles
          .map(Helpers.alterRow);
        return Helpers.addRandomField(state)

      default:
        break;
    }
    return this.state.tiles;
  }
  
  render() {
    const { tiles, status } = this.state;
    return (
      <Fragment>
        <HammerComponent>
          <div className="Container">
          {tiles.map((row, rowIndex) => <FieldRow row={row} index={rowIndex} key={rowIndex} />)}
          </div>
        </HammerComponent>
        <Status name={status} />
      </Fragment>
    );
  }
}

export default Container;