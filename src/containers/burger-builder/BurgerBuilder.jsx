import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import myAxios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../components/store/actions/index';
import { connect } from 'react-redux';

// const INGREDIENT_PRICES = {
//   salad: 0.6,
//   cheese: 0.7,
//   meat: 1.5,
//   bacon: 0.9,
// };
class BurgerBuilder extends Component {
  _isMounted = false;

  state = {
    purchasing: false,
    doCheckout: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.onInitIngredients();
    // commented out for redux
    // myAxios
    //   .get('https://burgerbuilder-samih.firebaseio.com/ingredients.json')
    //   .then((resp) => {
    //     this.setState({ ingredients: resp.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  updatePurchasable(ingredients) {
    const purchasable = Object.values(ingredients).some((amount) => amount > 0);
    // this.setState({ purchasable });
    return purchasable;
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

  // addIngHandler = (type) => {
  //   const updatedCount = this.state.ingredients[type] + 1;
  //   const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

  //   const updatedIngs = { ...this.state.ingredients };
  //   updatedIngs[type] = updatedCount;

  //   this.setState({
  //     ingredients: updatedIngs,
  //     totalPrice: updatedPrice,
  //   });
  //   this.updatePurchasable(updatedIngs);
  // };

  // removeIngHandler = (type) => {
  //   const updatedCount = this.state.ingredients[type] - 1;
  //   if (updatedCount > -1) {
  //     const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

  //     const updatedIngs = { ...this.state.ingredients };
  //     updatedIngs[type] = updatedCount;

  //     this.setState({
  //       ingredients: updatedIngs,
  //       totalPrice: updatedPrice,
  //     });
  //     this.updatePurchasable(updatedIngs);
  //   }
  // };

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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: (ingNAme) => dispatch(burgerBuilderActions.addIngredient(ingNAme)),
    onIngredientRemove: (ingNAme) => dispatch(burgerBuilderActions.removeIngredient(ingNAme)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, myAxios));
