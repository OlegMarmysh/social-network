import React, { useEffect } from 'react'
import './App.css'
import { HashRouter, Route } from 'react-router-dom'
import UsersContainer from './components/Users/UsersContainer'
import Login from './components/Login/Login'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import Preloader from './components/Common/Preloader/Preloader'
import store from './redux/reduxStore'
import { withSuspense } from './hoc/withSuspense'
import Header from './components/Header/Header'

const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'))
const Profile = React.lazy(() => import('./components/Profil/Profile'))

const App = () => {
  const dispatch = useDispatch()
  const initialized = useSelector(state => state.app.initialized)
  const isAuth = useSelector(state => state.auth.isAuth)
  useEffect(() => {
    dispatch(initializeApp())
  }, [])
  if (!initialized) {
    return <Preloader/>
  }
  return (
    <>
      <div className='appWrapper'>
        {isAuth && <Header/>}
        <div className='app_wrapper_profile'>
          <Route exact path to='/' render={withSuspense(Profile)}/>
          <Route path='/profile/:userId?' render={withSuspense(Profile)}/>
          <Route path='/dialogs/:userId?' render={withSuspense(Dialogs)}/>
          <Route path='/users' render={() => <UsersContainer/>}/>
          <Route path='/login' render={() => <Login/>}/>
        </div>
      </div>
    </>
  )
}

const SocialApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>
  )
}

export default SocialApp
