import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setAlert } from '../../redux/alert/actions'
import { register } from '../../redux/auth/actions'

//

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormDate] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const handleChange = e => setFormDate({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    alert('hi')
    e.preventDefault()

    if (password !== password2) {
      setAlert('Passowrds do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <div className='modify-div'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Create Your Account
      </p>

      <form className='form' onSubmit={e => handleSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => handleChange(e)}
            required
          />
        </div>

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

        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Register' />
      </form>

      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
