import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/auth/actions';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormDate] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e =>
    setFormDate({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='modify-div'>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Sign Into Your Account
      </p>

      <form className='form' onSubmit={e => handleSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>

      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </div>
  );
};

Login.protoType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
