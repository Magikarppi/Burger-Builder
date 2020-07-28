import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

beforeEach(cleanup);

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated, auth and burger builder', () => {
    const history = createMemoryHistory();

    const { getAllByTestId, getByText } = render(
      <Router history={history}>
        <NavigationItems />
      </Router>
    );

    expect(getAllByTestId('navlink-item')).toHaveLength(2);
    expect(getByText(/Authenticate/i)).toBeTruthy();
    expect(getByText(/burger builder/i)).toBeTruthy();
  });

  it('should render three <NavigationItem /> elements if authenticated, logout, orders, and burger builder', () => {
    const history = createMemoryHistory();

    const { getAllByTestId, getByText } = render(
      <Router history={history}>
        <NavigationItems isAuthenticated={true} />
      </Router>
    );

    expect(getAllByTestId('navlink-item')).toHaveLength(3);
    expect(getByText(/logout/i)).toBeTruthy();
    expect(getByText(/orders/i)).toBeTruthy();
    expect(getByText(/burger builder/i)).toBeTruthy();
  });
});
