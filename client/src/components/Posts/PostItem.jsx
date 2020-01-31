import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

//

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <a href='#!'>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </a>
      </div>

      <div>
        <p class='my-1'>{text}</p>

        <p class='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        <button type='button' class='btn btn-light'>
          <i class='fa fa-thumbs-up'></i> <span>{likes.length}</span>
        </button>

        <button type='button' class='btn btn-light'>
          <i class='fa fa-thumbs-down'></i>
        </button>

        <Link to={`/post/${_id}`} class='btn btn-primary'>
          Discussions <span class='comment-count'>{comments.length}</span>
        </Link>

        {!auth.loading && user === auth.user._id && (
          <button type='button' class='btn btn-danger'>
            <i class='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToPorps = state => ({
  auth: state.auth
});

export default connect(mapStateToPorps)(PostItem);
