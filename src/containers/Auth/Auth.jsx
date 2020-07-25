import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';
import * as actions from '../../components/store/actions/index';

class Auth extends Component {
  state = {
    formIsValid: false,
    isSignUp: true,
    authForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
          valid: false,
          touched: false,
        },
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          valid: false,
          touched: false,
        },
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = null;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.length >= 6;
      console.log('isValid', isValid);
    }

    return isValid;
  };

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.authForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputId],
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.validation.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.validation.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    const formIsValid = Object.values(updatedOrderForm).every(
      (value) => value.validation.valid
    );

    this.setState({ authForm: updatedOrderForm, formIsValid: formIsValid });
  };

  authHandler = (e) => {
    e.preventDefault();

    const email = this.state.authForm.email.value;
    const password = this.state.authForm.password.value;
    const isSignUp = this.state.isSignUp;

    this.props.onAuth(email, password, isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    const formElements = Object.entries(this.state.authForm).map(
      ([key, value]) => {
        return { id: key, config: value };
      }
    );

    const form = formElements.map((el) => (
      <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        invalid={!el.config.validation.valid}
        touched={el.config.validation.touched}
        handleChange={(event) => this.inputChangeHandler(event, el.id)}
      />
    ));

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      if (this.props.buildingBurger) {
        authRedirect = <Redirect to='/checkout' />
      } else {
        authRedirect = <Redirect to='/' />
      }
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {this.state.isSignUp ? <h2>Sign Up</h2> : <h2>Log in</h2>}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.authHandler}>
            {form}
            <Button btnType="Success" disabled={!this.state.formIsValid}>
              Submit
            </Button>
          </form>
        )}

        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {this.state.isSignUp
            ? 'Already have an account? Click here to log in.'
            : "Don't have an account yet? Click here to sign up."}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    buildingBurger: state.burgerBuilder.buildingBurger
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
