import React, { useEffect } from 'react'
import Description from './Description/Description'
import MyPostContainer from './MyPost/MyPostContainer'
import s from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { getUserProfile, getUserStatus } from '../../redux/profilePageReducer'

const Profile = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const match = useRouteMatch()
  const autorizedUserId = useSelector(state => state.auth.userId)
  const refreshProfile = () => {
    let userId = match.params.userId
    if (!userId) {
      userId = autorizedUserId
      if (!userId) {
        history.push('/login')
      }
    }
    dispatch(getUserProfile(userId))
    dispatch(getUserStatus(userId))
  }
  useEffect(() => {
    refreshProfile()
  }, [])
  useEffect(() => {
    refreshProfile()
  }, [match.params.userId])

  return (
    <div className={s.profileContent}>
      <div className={s.descriptionContent}>
        <Description isOwner={!match.params.userId} />
      </div>
      <div className={s.myPostContent}>
        <MyPostContainer />
      </div>
    </div>
  )
}

export default Profile
