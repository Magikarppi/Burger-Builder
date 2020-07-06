import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import myAxios from '../../axios-orders';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    myAxios
      .get('/orders.json')
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders })
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order key={order.id} order={order} />
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, myAxios);