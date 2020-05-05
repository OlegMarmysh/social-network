import React from 'react'
import { reduxForm } from 'redux-form'
import { createField, Input } from '../Common/FormsControl'
import { required } from '../utilits/validators'
import { useDispatch, useSelector } from 'react-redux'
import { login, setCaptcha } from '../../redux/authReducer'
import { Redirect } from 'react-router-dom'
import styles from '../Common/FormsControl.module.css'
import styleLogin from './Login.module.css'
import reload from '../../images/reload.png'

const Login = () => {
  const { isAuth, captchaUrl } = useSelector(state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
  }))
  const dispatch = useDispatch()
  const onSubmit = ({ email, password, rememberMe, captcha, ...formData }) => {
    dispatch(login(email, password, rememberMe, captcha))
  }
  const onSetCaptcha = () => {
    dispatch(setCaptcha())
  }
  if (isAuth) {
    return <Redirect to={'/profile'}/>
  }
  return (
    <div className={styleLogin.wrapper}>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} onSetCaptcha={onSetCaptcha}/>
    </div>
  )
}

const LoginForm = ({ handleSubmit, error, captchaUrl, onSetCaptcha }) => {
  return (
    <form onSubmit={handleSubmit} className={styleLogin.loginForm}>
      <h2>Sign in</h2>
      {createField('email', 'Email', Input, [required], { type: 'text' })}
      {createField('password', 'Password', Input, [required], { type: 'password' })}
      <div className={styleLogin.checkbox}>
        {createField('rememberMe', null, 'input', null, { type: 'checkbox' }, 'Remember me')}
      </div>
      <div className={styles.loginError}>
        {error}
      </div>
      <div className={styleLogin.captcha}>
        <div>
          <img src={captchaUrl}/>
          {captchaUrl && <img src={reload} onClick={onSetCaptcha} className={styleLogin.reloadImg}/>}
        </div>
        <div>
          {captchaUrl && createField('captcha', 'captcha', Input, [required])}
        </div>
      </div>
      <div >
        <button className={styleLogin.loginBtn}>Sign in</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)

export default Login
