import React, { useEffect } from 'react'
import s from './Header.module.css'
import {NavLink, Redirect} from 'react-router-dom'
import Navbar from './Navbar/NavBar'
import userPhoto from '../../images/users-vector-icon-png_260862.jpg'
import Preloader from '../Common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthUserProfile, logout } from '../../redux/authReducer'

const Header = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.userId)
  const profile = useSelector(state => state.auth.profile)
  const login = useSelector(state => state.auth.login)
  const isAuth = useSelector(state => state.auth.isAuth)
  useEffect(() => {
    dispatch(getAuthUserProfile(userId))
  }, [])
  if (!profile) {
    return <Preloader/>
  }
  const onLogout = () => {
    dispatch(logout())
  }
  return (
    <div className={s.header}>
      <div className={s.headerContent}>
        <img src='https://avatanplus.com/files/resources/mid/5cd273c518f1216a961439ee.png' alt='avatar'/>
        <div>
          <Navbar/>
        </div>
        <div className={s.loginWrapper}>
          {isAuth
            ? (<div className={s.loginContent}>
              <img src={profile.photos.small || userPhoto} alt="profile Photo"/>
              <div>
                <span style={{ color: '#fffffe', fontWeight: 'bold', fontSize: '14px' }}>{login}</span>
                <a onClick={onLogout}>Log out</a>
              </div>
            </div>
            )
            : <NavLink to={'/login'}>Login</NavLink>}
        </div>
      </div>
    </div>
  )
}

export default Header
