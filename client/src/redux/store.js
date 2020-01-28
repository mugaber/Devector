import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReucer from './root-reducer';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReucer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
