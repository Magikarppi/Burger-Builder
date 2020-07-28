import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actions from '../../components/store/actions/index';
import { connect } from 'react-redux';

export class BurgerBuilder extends Component {
  _isMounted = false;

  state = {
    purchasing: false,
    doCheckout: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.onInitIngredients();
  }

  updatePurchasable(ingredients) {
    const purchasable = Object.values(ingredients).some((amount) => amount > 0);
    return purchasable;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push('/auth')
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.setState({ doCheckout: true });
  };

  render() {
    let disabledInfo = null;
    if (this.props.ingredients) {
      const output = Object.entries(this.props.ingredients);
      output.forEach((val) => (val[1] = val[1] <= 0));
      disabledInfo = Object.fromEntries(output);
    }
    return (
      <>
        {this.state.doCheckout ? (
          <Redirect
            to={{ pathname: 'checkout' }}
          />
        ) : null}
        <Modal
          show={this.state.purchasing}
          purchaseCancel={this.purchaseCancelHandler}
        >
            <OrderSummary
              ingredients={this.props.ingredients}
              purchaseCancel={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
              totalPrice={this.props.totalPrice.toFixed(2)}
            />
        </Modal>
        {this.props.error ? <p>Fetching ingredients failed</p> : null}
        {this.props.ingredients ? (
          <>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              isAuthenticated={this.props.isAuthenticated}
              addIngHandler={this.props.onIngredientAdd}
              removeIngHandler={this.props.onIngredientRemove}
              disabledInfo={disabledInfo}
              totalPrice={this.props.totalPrice.toFixed(2)}
              purchasable={this.updatePurchasable(this.props.ingredients)}
              purchaseHandler={this.purchaseHandler}
            />
          </>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: (ingNAme) => dispatch(actions.addIngredient(ingNAme)),
    onIngredientRemove: (ingNAme) => dispatch(actions.removeIngredient(ingNAme)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
