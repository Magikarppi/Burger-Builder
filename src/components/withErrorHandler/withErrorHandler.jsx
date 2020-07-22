import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
// import orderAxios from '../../axios-orders';

const withErrorHandler = (WrappedComponent, orderAxios) => {
  return class extends Component {
    _isMounted = false;
    state = {
      error: null
    }

    componentDidMount() {
      this._isMounted = true;
      orderAxios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })

      orderAxios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      })
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <>
          <Modal show={this.state.error} purchaseCancel={this.errorConfirmedHandler}>{this.state.error ? this.state.error.message: null}</Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }
};

export default withErrorHandler;
