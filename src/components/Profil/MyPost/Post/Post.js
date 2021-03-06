import React from 'react'
import s from './Post.module.css'
import { useDispatch } from 'react-redux'
import { profileActions } from '../../../../redux/profileActions'

const Post = (props) => {
  const dispatch = useDispatch()
  const onDeletePost = () => {
    dispatch(profileActions.deletePost(props.postId))
  }
  return (
    <div className={s.post}>
      <div className={s.postContent}>
        <img src='https://avatarko.ru/img/kartinka/1/multfilm_gomer.png'/>
        {props.post}
        <div>
          <span>Like {props.likeCounts}</span>
          <button onClick={onDeletePost}>X</button>
        </div>
      </div>
    </div>
  )
}

export default Post
