import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, orderAxios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
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
