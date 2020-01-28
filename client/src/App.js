import React, { Fragment, useEffect } from 'react';
import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/auth/actions';

import Register from './components/auth/Register';
import { Landing } from './components/layout/Landing';
import { Navbar } from './components/layout/Navbar';
import { Login } from './components/auth/Login';
import Alert from './components/layout/Alert';

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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
