import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../redux/profile/actions';

//

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: ''
  });

  const [toDateDisabled, toggelDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description
  } = formData;

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fa fa-graduation-cap'></i>
        Add any school, bootcamp, etc that you have attended
      </p>
      <small>* = required field</small>

      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={e => handleChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className='form-group'>
          <label>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggelDisabled(!toDateDisabled);
              }}
            />{' '}
            Current School or Bootcamp
          </label>
        </div>

        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            disabled={toDateDisabled ? 'disabled' : ''}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            value={description}
            onChange={e => handleChange(e)}
            placeholder='Program Description'
          ></textarea>
        </div>

        <input type='submit' className='btn btn-primary my-1' />

        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
