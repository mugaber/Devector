import { combineReducers } from 'redux';
import alertReducer from './alert/reducer';
import authReducer from './auth/reducer';
import profile from './profile/reducer';
import post from './post/reducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile,
  post
});
