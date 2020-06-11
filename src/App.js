import React from 'react';

import Layout from './components/layout/Layout'
import BurgerBuilder from './containers/burger-builder/BurgerBuilder'

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
