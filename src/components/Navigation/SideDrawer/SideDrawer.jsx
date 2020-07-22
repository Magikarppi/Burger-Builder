import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <>
      <Backdrop show={props.show} cancel={props.cancel}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height="11%" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
