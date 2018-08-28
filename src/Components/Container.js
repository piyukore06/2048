import React, { Component, Fragment } from 'react';
import './../Styles/Container.css';

import FieldRow from './FieldRow';
import { StatusImage } from './StatusImage';
import * as Constants from './../Functions/Constants';

class Container extends Component {
  state = null;
  componentWillMount() {
    this.setInitialState();
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  setInitialState = () => {
    this.setState({
      tiles :  Array(Constants.GridSize).fill(null).map(_ => this.getRandomRow()),
      status: Constants.Status.START
    });
  }
  handleKeyDown = (event) => {
    const tiles = this.getAlteredTiles(event.key);
    this.setState({
      ...this.state,
      tiles
    });
    this.checkStatus();
  }
  // 2d Matrix transpose method
  transpose = (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i]));

  reverseRow = row => row.reverse();

  // checking tiles status to output the status image  
  checkStatus = () => {
    const tiles = this.state.tiles.reduce((accumulator, currentRow) => accumulator.concat(currentRow));
    const status = this.getStatus(tiles);
    this.setState({
      ...this.state,
      status
    });
  }
  getAlteredTiles = (key) => {
    const randomRowIndex = this.getRandomNumber();
    const randomNumber = this.getRandomNumber({min: 1, max: 2});
    switch (key) {
      case 'ArrowDown':
        return this.state.tiles
          .reduce(this.transpose, [])
          .map(this.reverseRow)
          .map(this.alterRow)
          .map((row, index) => this.addRandomField(row, index, randomRowIndex, randomNumber))
          .map(this.reverseRow)
          .reduce(this.transpose, [])

      case 'ArrowUp':
        return this.state.tiles
            .reduce(this.transpose, [])
            .map(this.alterRow)
            .map((row, index) => this.addRandomField(row, index, randomRowIndex, randomNumber))
            .reduce(this.transpose, []);

      case 'ArrowRight':
        return this.state.tiles
            .map(this.reverseRow)
            .map(this.alterRow)
            .map((row, index) => this.addRandomField(row, index, randomRowIndex, randomNumber))
            .map(this.reverseRow)

      case 'ArrowLeft':
        return this.state.tiles
          .map(this.alterRow)
          .map((row, index) => this.addRandomField(row, index, randomRowIndex, randomNumber))

      default:
        break;
    }
  }
  getStatus = (tiles) => {
    const doesProgressMoveTileExist = tiles.some(value => Constants.ProgressMoves.indexOf(value) !== -1);
    const doesWinningTileExist = tiles.filter(value => value === Constants.WinningTile).length;
    const doesAlmostWinningTileExist = tiles.filter(value => value === Constants.AlmostWinningTile).length;
    const doesZeroExist = tiles.filter(value => value === 0).length;
    if (doesProgressMoveTileExist) {
      const randomImage = this.getRandomNumber({ min: 0, max: 3 });
      return randomImage === 3 ? null :Constants.Status.MOVE[randomImage];
    } else if (!doesZeroExist) {
      document.removeEventListener('keydown', this.handleKeyDown);
      return Constants.Status.LOST;
    } else if (doesAlmostWinningTileExist) {
      return Constants.Status.ALMOST_WON
    } else if (doesWinningTileExist) {
      return Constants.Status.WON
    }
  }

  // chage row on key press
  // defined basically for Keypress ArrowLeft
  // Same Logic is used for other Keypress Events changing the array order in appropriate manner 
  alterRow = (row) => {
    let saveRepeatingIndex = [];
    row.forEach((fieldColumn, columnIndex) => {
      if (columnIndex < Constants.GridSize - 1 && fieldColumn === row[columnIndex + 1]) {
        saveRepeatingIndex.push(columnIndex)
      }
    });
    if (saveRepeatingIndex.length === Constants.GridSize - 1) {
      saveRepeatingIndex = saveRepeatingIndex.filter((repeatingIndex, index) => index % 2 !== 0);
    }
    saveRepeatingIndex.forEach(_ => {
      for (let index = 0; index <= row.length; index++) {
        if (index < Constants.GridSize - 1 && row[index] === row[index + 1]) {
          row[index] = row[index] * 2;
          row = [...row.slice(0, index + 1), ...row.slice(index + 2)];
          break;
        }
      }
    });
    row = row.filter(field => field !== 0);
    return [...row, ...Array(Constants.GridSize - row.length).fill(0)];
  }

  // Random Field is added taking into consideration the default AlterRow Keypress ArrowLeft
  // This is to be called immidieately after alterRow to have field creation at correct place
  addRandomField = (row, index, randomRowIndex, randomNumber) => {
    if (index === randomRowIndex) {
      row[Constants.GridSize - 1] = randomNumber;
    }
    return row;
  }

  getRandomNumber = ({ min, max } = { min: 0, max: 2 }) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomRow = () => {
    return Array(Constants.GridSize).fill(null).map(_ => this.getRandomNumber());
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