import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControl";
import {required} from "../utilits/validators";
import {connect} from "react-redux";
import {login, setCaptcha} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../Common/FormsControl.module.css"

const Login = ({login, isAuth, captchaUrl, setCaptcha}) => {
    let onSubmit = ({email, password, rememberMe, captcha, ...formData}) => {
        login(email, password, rememberMe, captcha)
    };
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} setCaptcha={setCaptcha}/>
        </div>
    )
};

const LoginForm = ({handleSubmit, error, captchaUrl, setCaptcha}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('email', 'Email', Input, [required])}
            {createField('password', 'Password', Input, [required], {type: 'password'})}
            {createField('rememberMe', null, 'input', null, {type: 'checkbox'}, 'remember me')}
            <div className={styles.loginError}>
                {error}
            </div>
            <div>
                <img src={captchaUrl}/>
                {captchaUrl && <button onClick={setCaptcha}>Reload</button>}
            </div>
            <div>
                {captchaUrl && createField('captcha', 'captcha', Input, [required])}
            </div>
            <div>
                <button>Login</button>
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
