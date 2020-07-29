import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
  };

  it('should return the default state if no state provided', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store token on login', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInV_adQssw5c';
    const userId = 'sbsabbre34';
    const loginData = { token, userId };

    expect(
      reducer(initialState, { type: actionTypes.AUTH_SUCCESS, ...loginData })
    ).toEqual({ ...initialState, token: token, userId: userId });
  });
});

