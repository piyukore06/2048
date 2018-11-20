import React from 'react';
import './../Styles/Field.css';

export const Field = (props) => {
  const value = props.value || '';
  const className = 'Field-' + value;
  console.log(className);
  return (
    <div className={value ? 'Field ' + className : 'Field Elevated'} >
      {value}
    </div>
  );
};
