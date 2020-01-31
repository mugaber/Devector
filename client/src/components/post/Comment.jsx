import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeComment } from '../../redux/post/actions';

//

const Comment = ({
  comment: { _id, text, user, name, avatar, date },
  postId,
  auth,
  removeComment
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img class='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class='my-1'>{text}</p>
        <p class='post-date'>
          Commented on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            class='btn btn-danger'
            onClick={() => removeComment(postId, _id)}
          >
            <i class='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToPorps = state => ({
  auth: state.auth
});

export default connect(mapStateToPorps, { removeComment })(Comment);
