import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../redux/post/actions';

//

const PostItem = ({
  auth,
  addLike,
  removeLike,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <a href='#!'>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </a>
      </div>

      <div>
        <p className='my-1'>{text}</p>

        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        <button
          onClick={() => addLike(_id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fa fa-thumbs-up'></i> <span>{likes.length}</span>
        </button>

        <button
          type='button'
          className='btn btn-light'
          onClick={() => removeLike(_id)}
        >
          <i className='fa fa-thumbs-down'></i>
        </button>

        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussions <span className='comment-count'>{comments.length}</span>
        </Link>

        {!auth.loading && user === auth.user._id && (
          <button type='button' className='btn btn-danger'>
            <i className='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToPorps = state => ({
  auth: state.auth
});

export default connect(mapStateToPorps, { addLike, removeLike })(PostItem);
