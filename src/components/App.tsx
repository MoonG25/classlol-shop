import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import IndexPage from './pages';
import CartPage from './pages/cart';
import ProductPage from './pages/products';
import NotFound from './pages/error/not-found';
import Layout from './common/layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/products" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
