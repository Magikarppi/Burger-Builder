import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  let validationErrorMessage = null;
  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid)
    validationErrorMessage = <p>Please enter a valid value</p>
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          {...props.elementConfig}
          onChange={props.handleChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
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
          className={inputClasses.join(' ')}
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
      {validationErrorMessage}
    </div>
  );
};

export default input;
