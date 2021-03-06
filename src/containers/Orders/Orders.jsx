import React, { Component } from 'react';
import { connect } from 'react-redux';


import Order from '../../components/Order/Order';
import * as actions from '../../components/store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: false,
  // };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
    // myAxios
    //   .get('/orders.json')
    //   .then((res) => {
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({ ...res.data[key], id: key });
    //     }
    //     this.setState({ loading: false, orders: fetchedOrders })
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  }

  
  render() {
    if (this.props.orders && !this.props.loading) {
      return (
        <div>
          {this.props.orders.map(order => {
            return <Order key={order.id} order={order} />
          })}
        </div>
      );
    }
    return <Spinner />
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);