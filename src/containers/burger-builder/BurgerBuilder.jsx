import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.6,
  cheese: 0.7,
  meat: 1.5,
  bacon: 0.9,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 6,
    purchasable: false,
    purchasing: false,
  };

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
    alert('You Continue!');
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
    const output = Object.entries(this.state.ingredients);
    output.forEach((val) => (val[1] = val[1] <= 0));
    const disabledInfo = Object.fromEntries(output);

    console.log('disabledInfo', disabledInfo);
    return (
      <>
        <Modal
          show={this.state.purchasing}
          purchaseCancel={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice.toFixed(2)}
          />
        </Modal>
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
    );
  }
}

export default BurgerBuilder;