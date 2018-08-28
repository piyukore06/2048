import React from 'react';
import './../Styles/Field.css';

export const Field = (props) =>
<div className={props.value === 0 ? 'Field' : 'Field Elevated'} >
  {props.value === 0 ? '' : props.value}
</div>;
