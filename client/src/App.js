import React, { Fragment, useEffect } from 'react';
import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/auth/actions';

import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';

//
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
//

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
