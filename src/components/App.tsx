import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import IndexPage from './pages';
import CartPage from './pages/cart';
import ProductPage from './pages/products';
import NotFound from './pages/error/not-found';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">index</Link>
        <Link to="/products">products</Link>
        <Link to="/cart">cart</Link>
        <Link to="/error">error</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/products" component={ProductPage} />
        <Route path="/cart" component={CartPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
