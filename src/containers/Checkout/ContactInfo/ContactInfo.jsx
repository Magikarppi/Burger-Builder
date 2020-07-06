import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactInfo.module.css';
import myAxios from '../../../axios-orders';

class ContactInfo extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  orderHandler = (e) => {
    e.preventDefault()

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Sam',
        address: {
          street: 'street123',
          zip: 99910,
          country: 'Finland',
        },
        email: 'samsamsam71477@gmail.com',
      },
      deliveryMethod: 'home delivery',
    };

    myAxios
      .post('/orders.json', order)
      .then((resp) => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className={classes.ContactInfo}>
        <h4>Please enter your contact info</h4>
        <form>
          <Input inputtype='input' type='text' name='name' placeholder='your name' />
          <Input inputtype='input' type='email' name='email' placeholder='your email' />
          <Input inputtype='input' type='text' name='street' placeholder='street' />
          <Input inputtype='input' type='text' name='postal' placeholder='postal code' />
          <Button btnType='Success' clicked={this.orderHandler} >PLACE ORDER</Button>
        </form>
      </div>
    )
  }
}

export default withRouter(ContactInfo);