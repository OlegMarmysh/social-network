import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../Common/FormsControl";
import s from './ProfileDataReduxForm.module.css';
import styles from "../../Common/FormsControl.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <div className={s.content}>
        <form onSubmit={handleSubmit}>
            {error && <div className={styles.loginError}>
                {error}
            </div>}
            <div>
                <b>Full Name: </b> {createField('fullName', 'Full Name', Input, null, {type: 'text'})}
            </div>
            <div>
                <b>About me: </b> {createField('aboutMe', 'About me', Input, null, {type: 'text'})}
            </div>
            <div className={s.lookForJob}>
                <b>Looking for a job: </b> {createField('lookingForAJob', null, Input, null, {type: 'checkbox'})}
            </div>
            <b>Looking for a job
                description: </b> {createField('lookingForAJobDescription', 'Looking for a job description', Input, null, {type: 'text'})}
            <div>
                <button>save</button>
            </div>
            {/*<div>
                <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: </b> {createField('contacts.' + key, key, Input)}
                </div>
            })}
            </div>*/}
        </form>
    </div>
};

const ProfileDataReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm);

export default ProfileDataReduxForm