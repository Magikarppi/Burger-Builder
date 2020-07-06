import React from 'react'

import classes from './Input.module.css'

const input = (props) => {

  
  return (
  <div className={classes.Input}>
    <label className={classes.Label}>
      {props.label}
    </label>
    <input className={classes.InputElement} {...props} />
  </div>
)}

export default input;