import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p><strong>Current price: {props.totalPrice}€</strong></p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          addIng={() => props.addIngHandler(ctrl.type)}
          removeIng={() => props.removeIngHandler(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchaseHandler}>ORDER NOW</button>
    </div>
  );
};

export default buildControls;
