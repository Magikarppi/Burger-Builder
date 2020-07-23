import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    console.log('authData', authData);
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc8r2N_zdVI1um3NT0kWYUyz1JiqnJWiM';

    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc8r2N_zdVI1um3NT0kWYUyz1JiqnJWiM';
    }
    axios
      .post(url, authData)
      .then((resp) => {
        console.log('resp.data', resp.data);
        const expirationDate = new Date(
          new Date().getTime() + resp.data.expiresIn * 1000
        );
        console.log('expirationDate', expirationDate);
        localStorage.setItem('token', resp.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', resp.data.localId);
        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuthTimeout(resp.data.expiresIn));
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      console.log('expDate', expirationDate)
      console.log('newDAte', new Date())
      if (expirationDate > new Date()) {
        console.log('bigg')
        const userId = localStorage.getItem('userId')
        const expTime = ((expirationDate.getTime() - new Date().getTime()) / 1000);
        console.log('expTime', expTime)
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expTime));
      } else {
        console.log('else')
        dispatch(logout());
      }
    }
  }
}