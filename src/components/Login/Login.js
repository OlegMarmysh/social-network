import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControl";
import {required} from "../utilits/validators";
import {connect} from "react-redux";
import {login, setCaptcha} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../Common/FormsControl.module.css"
import styleLogin from "./Login.module.css"
import reload from '../../images/reload.png'

const Login = ({login, isAuth, captchaUrl, setCaptcha}) => {
    let onSubmit = ({email, password, rememberMe, captcha, ...formData}) => {
        login(email, password, rememberMe, captcha)
    };
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div className={styleLogin.wrapper}>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} setCaptcha={setCaptcha}/>
        </div>
    )
};

const LoginForm = ({handleSubmit, error, captchaUrl, setCaptcha}) => {
    return (
        <form onSubmit={handleSubmit} className={styleLogin.loginForm}>
            <h2>Sign in</h2>
            {createField('email', 'Email', Input, [required], {type: 'text'})}
            {createField('password', 'Password', Input, [required], {type: 'password'})}
            <div className={styleLogin.checkbox}>
                {createField('rememberMe', null, 'input', null, {type: 'checkbox'}, 'Remember me')}
            </div>
            <div className={styles.loginError}>
                {error}
            </div>
            <div className={styleLogin.captcha}>
                <div>
                    <img src={captchaUrl}/>
                    {captchaUrl && <img src={reload} onClick={setCaptcha} className={styleLogin.reloadImg}/>}
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
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
};

export default connect(mapStateToProps, {login, setCaptcha})(Login)
