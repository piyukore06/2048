import React from 'react';
import './../Styles/Cell.css';

export const Cell = (props) => {
  const value = props.value || '';
  const className = 'Cell-' + value;
  return (
    <div className={value ? 'Cell ' + className : 'Cell Elevated'} >
      {value}
    </div>
  );
};
