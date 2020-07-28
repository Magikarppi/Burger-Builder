import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

import { BurgerBuilder } from './BurgerBuilder';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as actions from '../../components/store/actions/index';

beforeEach(cleanup);

describe('<BurgerBuilder />', () => {
  it('should not render BuildControls if we have fail to have ingredients', () => {
    const history = createMemoryHistory();

    const { queryByText } = render(
      <Router history={history}>
        <BurgerBuilder onInitIngredients={() => {}} totalPrice={6}/>
      </Router>
    );

    expect(queryByText(/current price/i)).toBe(null);
  })
})
