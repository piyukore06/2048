import React, { Component, Fragment } from 'react';
import './../Styles/Field.css';
import {Field} from './Field';

class FieldRow extends Component {
  render() {
    return (
      <Fragment>
        {this.props.row.map((field, columnIndex) => <Field value={field} key={this.props.rowIndex + '-' + columnIndex} />)}
      </Fragment>
    );
  }
}

export default FieldRow;