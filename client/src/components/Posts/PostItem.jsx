import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../redux/post/actions';

//

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className='my-1'>{text}</p>

        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <>
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

            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussions{' '}
              <span className='comment-count'>{comments.length}</span>
            </Link>

            {!auth.loading && user === auth.user._id && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => deletePost(_id)}
              >
                <i className='fa fa-times'></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToPorps = state => ({
  auth: state.auth
});

export default connect(mapStateToPorps, { addLike, removeLike, deletePost })(
  PostItem
);
