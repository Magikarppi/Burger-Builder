import React from 'react';

import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

import { BurgerBuilder } from './BurgerBuilder';

beforeEach(cleanup);

describe('<BurgerBuilder />', () => {
  it('should not render BuildControls if we have fail to have ingredients', () => {
    const history = createMemoryHistory();

    const { queryByText } = render(
      <Router history={history}>
        <BurgerBuilder onInitIngredients={() => {}} totalPrice={6} />
      </Router>
    );

    expect(queryByText(/current price/i)).toBe(null);
  });
});
