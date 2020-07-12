import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
    validation: {
      required: true,
      valid: false,
      touched: false
    }
  };
};

class ContactInfo extends Component {
  state = {
    loading: false,
    formIsValid: false,
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
        value: 'home delivery',
        validation: {
          required: true,
          valid: true,
        }
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = null;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    return isValid;
  }

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({loading: true})

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
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
    updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.validation.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    const formIsValid = Object.values(updatedOrderForm).every(value => (
      value.validation.valid
    ))

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
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
        <form onSubmit={this.orderHandler}>
          {formElements.map((el) => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              invalid={!el.config.validation.valid}
              touched={el.config.validation.touched}
              handleChange={(event) => this.inputChangeHandler(event, el.id)}
            />
          ))}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            PLACE ORDER
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(withRouter(ContactInfo));
