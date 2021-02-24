import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { cartReducer, calcAmount } from './cart/reducer';
import logger from 'redux-logger';
import { CALC_AMOUNT } from './cart/actions';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const calcAmountMiddleware: Middleware<
  {},
  RootState
> = store => next => async (action) => {
  const result = next(action);
  if (action.type !== CALC_AMOUNT) {
    const data = await calcAmount(store.getState().cart.cart);
    next({ type: CALC_AMOUNT, payload: data });
  }
  return result;
};

const store = createStore(
  rootReducer,
  applyMiddleware(calcAmountMiddleware, logger)
);

export default store;