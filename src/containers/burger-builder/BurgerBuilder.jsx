import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import myAxios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.6,
  cheese: 0.7,
  meat: 1.5,
  bacon: 0.9,
};
class BurgerBuilder extends Component {
  _isMounted = false;

  state = {
    ingredients: null,
    totalPrice: 6,
    purchasable: false,
    purchasing: false,
    loading: false,
    doCheckout: false,
  };

  componentDidMount() {
    this._isMounted = true;
    myAxios
      .get('https://burgerbuilder-samih.firebaseio.com/ingredients.json')
      .then((resp) => {
        this.setState({ ingredients: resp.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updatePurchasable(ingredients) {
    const purchasable = Object.values(ingredients).some((amount) => amount > 0);
    console.log('purchasable', purchasable);
    this.setState({ purchasable });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });

    this.setState({ doCheckout: true });
  };

  addIngHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    const updatedIngs = { ...this.state.ingredients };
    updatedIngs[type] = updatedCount;

    this.setState({
      ingredients: updatedIngs,
      totalPrice: updatedPrice,
    });
    this.updatePurchasable(updatedIngs);
  };

  removeIngHandler = (type) => {
    const updatedCount = this.state.ingredients[type] - 1;
    if (updatedCount > -1) {
      const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

      const updatedIngs = { ...this.state.ingredients };
      updatedIngs[type] = updatedCount;

      this.setState({
        ingredients: updatedIngs,
        totalPrice: updatedPrice,
      });
      this.updatePurchasable(updatedIngs);
    }
  };

  render() {
    let disabledInfo = null;
    if (this.state.ingredients) {
      const output = Object.entries(this.state.ingredients);
      output.forEach((val) => (val[1] = val[1] <= 0));
      disabledInfo = Object.fromEntries(output);
    }
    return (
      <>
        {this.state.doCheckout ? (
          <Redirect
            to={{ pathname: 'checkout', ingredients: this.state.ingredients, totalPrice: this.state.totalPrice }}
          />
        ) : null}
        <Modal
          show={this.state.purchasing}
          purchaseCancel={this.purchaseCancelHandler}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.state.ingredients}
              purchaseCancel={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              totalPrice={this.state.totalPrice.toFixed(2)}
            />
          )}
        </Modal>
        {this.state.ingredients ? (
          <>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              addIngHandler={this.addIngHandler}
              removeIngHandler={this.removeIngHandler}
              disabledInfo={disabledInfo}
              totalPrice={this.state.totalPrice.toFixed(2)}
              purchasable={this.state.purchasable}
              purchaseHandler={this.purchaseHandler}
            />
          </>
        ) : null}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, myAxios);
