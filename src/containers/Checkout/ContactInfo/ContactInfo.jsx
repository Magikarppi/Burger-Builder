import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactInfo.module.css';
import myAxios from '../../../axios-orders';

const formHelper = (elType, elConfType, elConfHolder) => {
  return {
    elementType: elType,
    elementConfig: {
      type: elConfType,
      placeholder: elConfHolder,
    },
    value: '',
  };
};

class ContactInfo extends Component {
  state = {
    loading: false,
    orderForm: {
      name: formHelper('input', 'text', 'your name'),
      email: formHelper('input', 'email', 'your email'),
      street: formHelper('input', 'text', 'street'),
      postalCode: formHelper('input', 'text', 'postal code'),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'home delivery', displayValue: 'home delivery' },
            { value: 'pick up', displayValue: 'pick up' },
          ],
        },
      },
    },
  };

  orderHandler = (e) => {
    e.preventDefault();

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
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    }

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputId] = updatedFormElement;

    this.setState({orderForm: updatedOrderForm})
  }

  render() {
    const formElements = Object.entries(this.state.orderForm).map(
      ([key, value]) => {
        return { id: key, config: value };
      }
    );

    return (
      <div className={classes.ContactInfo}>
        <h4>Please enter your contact info</h4>
        <form>
          {formElements.map((el) => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              handleChange={(event) => this.inputChangeHandler(event, el.id)}
            />
          ))}
          <Button btnType="Success" clicked={this.orderHandler}>
            PLACE ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(ContactInfo);
