import React from 'react'
import styles from './FormsControl.module.css'
import {Field} from "redux-form";
import {required} from "../utilits/validators";

const FormControl = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error;
    return (
        <div>
            <div className={hasError ? styles.error : ''}>
                {props.children}
            </div>
            <div className={styles.error}>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
};


export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export const createField = (name, placeholder, component, validators, props = {}, text = '') => (
    <div>
        <Field name={name} placeholder={placeholder} component={component} validate = {validators} {...props}/> {text}
    </div>
);