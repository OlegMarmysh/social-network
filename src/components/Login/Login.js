import React from "react";
import {Field, reduxForm} from "redux-form";
import handleSubmit from "redux-form/es/handleSubmit";

const Login = (props) => {
    let onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
};

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'login'} placeholder={'login'} component={'input'}/>
            </div>
            <div>
                <Field name={'password'} placeholder={'password'} component={'input'}/>
            </div>
            <div>
                <Field name={'rememberMe'} type={'checkbox'} component={'input'}/>remember me
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

export default Login
