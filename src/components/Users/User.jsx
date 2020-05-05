import React from 'react'
import styles from './User.module.css'
import userPhoto from '../../images/users-vector-icon-png_260862.jpg'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { follow, unFollow } from '../../redux/usersPageReducer'

const User = ({ userId, photos, followed, name, status, followingInProgress }) => {
  const dispatch = useDispatch()
  const onUnFollow = () => {
    dispatch(unFollow(userId))
  }
  const onFollow = () => {
    dispatch(follow(userId))
  }
  return (
    <div className={styles.user}>
      <div>
        <NavLink to={`/profile/${userId}`}>
          <img className={styles.photo} src={photos.small !== null ? photos.small : userPhoto}/>
        </NavLink>
      </div>
      <div>
        {followed
          ? <button className={styles.unfBtn} onClick={onUnFollow}
            disabled={followingInProgress.some(id => id === userId)}>Unfollow</button>
          : <button className={styles.follBtn} onClick={onFollow}
            disabled={followingInProgress.some(id => id === userId)}>Follow</button>}
      </div>
      <span>
        <div className={styles.fullName}>
          {name}
        </div>
        <div className={styles.status}>
          {status}
        </div>
      </span>
    </div>
  )
}

export default User
