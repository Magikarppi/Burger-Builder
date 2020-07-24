import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/burger-builder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './components/store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          {this.props.isAuthenticated ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/" component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
