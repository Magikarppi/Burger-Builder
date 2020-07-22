import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';

class Checkout extends Component {
  // state = {
  //   ingredients: this.props.location.ingredients
  //     ? this.props.location.ingredients
  //     : {},
  //   totalPrice: this.props.location.totalPrice
  //     ? this.props.location.totalPrice
  //     : 6,
  // };

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-info');
  };

  render() {
    const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
    return (
      <div>
        {purchasedRedirect}
        {this.props.ingredients ? (
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkoutContinueHandler}
          />
        ) : (
          <Redirect to="/" />
        )}

        <Route
          path={this.props.match.path + '/contact-info'}
          component={ContactInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
