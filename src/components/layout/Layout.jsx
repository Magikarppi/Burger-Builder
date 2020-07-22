import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCancelHandler = () => {
    this.setState({showSideDrawer: false})
  }

  showMenuHandler = () => {
    const show = this.state.showSideDrawer
    this.setState({showSideDrawer: !show})
  }

  render() {
    return (
      <>
        <Toolbar isAuthenticated={this.props.isAuthenticated} showMenu={this.showMenuHandler} />
        <SideDrawer isAuthenticated={this.props.isAuthenticated} show={this.state.showSideDrawer} cancel={this.sideDrawerCancelHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
