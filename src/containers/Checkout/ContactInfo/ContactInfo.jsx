import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactInfo.module.css';

class ContactInfo extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactInfo}>
        <h4>Please enter your contact info</h4>
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='your name' />
          <Button btnType='Success' >PLACE ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactInfo;