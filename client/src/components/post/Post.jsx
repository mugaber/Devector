import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../redux/post/actions';
import Spinner from '../layout/Spinner';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, getPost);

  return loading || !post ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn btn-primary'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToPorps = state => ({
  post: state.post
});

export default connect(mapStateToPorps, { getPost })(Post);
