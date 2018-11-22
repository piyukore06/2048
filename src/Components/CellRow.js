import React, { Component, Fragment } from 'react';
import './../Styles/Cell.css';
import Cell from './Cell';

class CellRow extends Component {
  render() {
    return (
      <Fragment>
        {this.props.row.map((cell, columnIndex) => <Cell value={cell} key={this.props.rowIndex + '-' + columnIndex} />)}
      </Fragment>
    );
  }
}

export default CellRow;