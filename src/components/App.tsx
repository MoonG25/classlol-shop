import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import NotFound from './pages/error/NotFound';
import Index from './pages/Index';
import Products from './pages/products/Products';

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
        <Route exact path="/" component={Index} />
        <Route path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
