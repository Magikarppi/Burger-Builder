import React, { Component } from 'react';

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
        <Toolbar showMenu={this.showMenuHandler} />
        <SideDrawer show={this.state.showSideDrawer} cancel={this.sideDrawerCancelHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
