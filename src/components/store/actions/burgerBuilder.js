import myAxios from '../../../axios-orders';

import * as actionTypes from './actionTypes';


export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  }
}

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  }
}

export const setIngredients = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings
  }
}

export const fetchIngsFailed = () => {
  return {
    type: actionTypes.FETCH_INGS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
     myAxios
      .get('https://burgerbuilder-samih.firebaseio.com/ingredients.json')
      .then((resp) => {
        dispatch(setIngredients(resp.data))
      })
      .catch((error) => {
        dispatch(fetchIngsFailed())
      });
  }
}