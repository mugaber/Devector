import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../redux/post/actions'
import Spinner from '../layout/Spinner'
import PostItem from '../Posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])

  return loading || !post ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn btn-primary'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />

      {post.comments ? (
        <div className='comments'>
          <div class='bg-dark p my-1'>
            <h3>Comments ...</h3>
          </div>
          {post.comments.map(comment => (
            <Comment key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      ) : (
        <div class='bg-primary p my-1'>
          <h3>No Comments yet...</h3>
        </div>
      )}
    </>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToPorps = state => ({
  post: state.post
})

export default connect(mapStateToPorps, { getPost })(Post)
