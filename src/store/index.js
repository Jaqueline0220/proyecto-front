import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer } from 'store/authReducer';
import { userReducer } from 'store/userReducer';
import { servicioReducer } from 'store/servicioReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  servicio: servicioReducer,
});

export const store = createStore(rootReducer, middleware);
