import React from 'react';

import classes from './Order.module.css'

const order = (props) => {
  console.log('props', props)

  const ingStyle = {
    textTransform: 'capitalize',
    display: 'inline-block',
    margin: '0 8px',
    border: '1px solid',
    padding: '1px 5px'
  }

  const ingredients = Object.entries(props.order.ingredients).map(([key, val]) => {
    return <span style={ingStyle}>{key}: {val} {''}</span>
  })

  const price = +props.order.price.toFixed(2)

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>{price}</strong></p>
    </div>
  )
}

export default order;