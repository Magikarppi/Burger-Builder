import React from 'react';

import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/burger-builder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
