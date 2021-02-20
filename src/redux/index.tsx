import { applyMiddleware, combineReducers, createStore } from 'redux';
import { cartReducer } from './cart/reducer';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer, 
  applyMiddleware(logger)
);

export default store;