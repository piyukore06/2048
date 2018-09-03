import React, { Component, Fragment } from 'react';
import './../Styles/Container.css';

import FieldRow from './FieldRow';
import { StatusImage } from './StatusImage';
import * as Constants from './../Functions/Constants';
import * as Helpers from './../Functions/Helpers';

class Container extends Component {
  state = null;
  componentWillMount() {
    this.setInitialState();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  setInitialState = () => {
    this.setState({
      tiles : Array(Constants.GridSize).fill(null).map(_ => Helpers.getRandomRow()),
      status: Constants.Status.START
    });
    document.addEventListener('keydown', this.handleKeyDown);
  }
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
    const status = this.getStatus(tiles);
    this.setState({
      ...this.state,
      status
    });
  }
  getStatus = (tiles) => {
    const doesProgressMoveTileExist = tiles.some(value => Constants.ProgressMoves.indexOf(value) !== -1);
    const doesWinningTileExist = tiles.filter(value => value === Constants.WinningTile).length;
    const doesAlmostWinningTileExist = tiles.filter(value => value === Constants.AlmostWinningTile).length;
    const doesZeroExist = tiles.filter(value => value === 0).length;
    if (!doesZeroExist) {
      document.removeEventListener('keydown', this.handleKeyDown);
      return Constants.Status.LOST;
    } else if (doesProgressMoveTileExist) {
      const randomImage = Helpers.getRandomNumber({ min: 0, max: 3 });
      return randomImage === 3 ? null :Constants.Status.MOVE[randomImage];
    } else if (doesAlmostWinningTileExist) {
      return Constants.Status.ALMOST_WON
    } else if (doesWinningTileExist) {
      return Constants.Status.WON
    }
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
        <div className="Container">
        {tiles.map((row, rowIndex) => <FieldRow row={row} index={rowIndex} key={rowIndex} />)}
        </div>
        <StatusImage name={status} />
      </Fragment>
    );
  }
}

export default Container;