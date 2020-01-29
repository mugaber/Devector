import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/actions';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const handleClick = () => {
    logout();
    return <Redirect to='/' />;
  };

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fa fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        {!loading && isAuthenticated ? (
          <>
            <li>
              <Link to='/dashboard'>
                <i className='fa fa-user'></i>{' '}
                <span className='hide-sm'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href='#!' onClick={() => handleClick()}>
                <i className='fa fa-sign-out-alt'></i>{' '}
                <span className='hide-sm'>Logout</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='#!'>Developers</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
