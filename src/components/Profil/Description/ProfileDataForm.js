import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../Common/FormsControl";

const ProfileDataForm = ({handleSubmit}) => {
    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                <button>save</button>
            </div>
            <div>
                <b>Full Name: </b> {createField('fullName', 'Full Name', Input)}
            </div>
            <div>
                <b>About me: </b> {createField('aboutMe', 'About me', Textarea)}
            </div>
            <div>
                <b>Looking for a job: </b> {createField('lookingForAJob', null, Input, null, {type: 'checkbox'})}
            </div>
            <b>Looking for a job description: </b> {createField('lookingForAJobDescription', 'Looking for a job description', Textarea)}
        </form>
    </div>
};

const ProfileDataReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm);

export default ProfileDataReduxForm