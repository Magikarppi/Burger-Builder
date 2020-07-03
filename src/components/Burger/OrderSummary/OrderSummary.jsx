import React from 'react';

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  if (props.ingredients) {
    const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
      return (
        <li key={ingKey}>
          <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '}
          {props.ingredients[ingKey]}
        </li>
      );
    });
  
    return (
      <>
        <h3>Your order</h3>
        <p>Burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Price: {props.totalPrice}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
        <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
      </>
    );
  } 
  return null
};

export default orderSummary;
