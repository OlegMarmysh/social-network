import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../Common/FormsControl";
import {required} from "../utilits/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import styles from "../Common/FormsControl.module.css"

const Login = ({login, isAuth}) => {
    let onSubmit = ({email, password, rememberMe, ...formData}) => {
        login(email, password, rememberMe)
    };
    if(isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('email', 'Email', Input,[required])}
            {createField('password', 'Password', Input,[required], {type: 'password'})}
            {createField('rememberMe', null,'input', null, {type: 'checkbox'}, 'remember me')}
            <div className={styles.loginError}>
                {error}
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
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {login})(Login)
