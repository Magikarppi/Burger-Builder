import myAxios from '../../../axios-orders';

import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = (order) => {
  return dispatch => {
    myAxios.post('/orders.json', order)
    .then((resp) => {
      // this.props.history.push('/');
      dispatch(purchaseBurgerSuccess(resp.data, order))
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err))
    });
  }
}