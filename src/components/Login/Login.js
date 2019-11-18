import React from "react";
import {Field, reduxForm} from "redux-form";
import handleSubmit from "redux-form/es/handleSubmit";
import {Input} from "../Common/FormsControl";
import {required} from "../utilits/validators";

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
                <Field name={'login'} placeholder={'login'} component={Input} validate = {[required]}/>
            </div>
            <div>
                <Field name={'password'} placeholder={'password'} component={Input} validate = {[required]}/>
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
