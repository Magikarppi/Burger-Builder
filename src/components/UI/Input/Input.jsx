import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
          onChange={props.handleChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.handleChange}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          value={props.value}
          {...props.elementConfig}
          onChange={props.handleChange}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
