import React, {useState} from 'react';
import s from './Description.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../images/users-vector-icon-png_260862.jpg";
import ProfileDataReduxForm from "./ProfileDataReduxForm";


const Description = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {
    const [editMode, setEditMode] = useState(false);
    if (!profile) {
        return <Preloader/>
    }
    let onChooseAvatar = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };
    const handleSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        );
    };
    return (
        <div className={s.description}>
            <div className={s.avatarContent}>
                <img className={s.avatar} src={profile.photos.large || userPhoto}/>
                {
                    isOwner && <div className={s.chooseAvatar}>
                        <label className={s.label}><input type={'file'} onChange={onChooseAvatar}/>Update photo</label>
                    </div>
                }
                <div className={s.editMode}>
                    {isOwner && <div>
                        <button onClick={() => {
                            setEditMode(true)
                        }}>edit
                        </button>
                    </div>}
                </div>
            </div>
            <div className={s.profileData}>
                {editMode ?
                    <ProfileDataReduxForm onSubmit={handleSubmit} profile={profile} initialValues={profile}/>
                    : <ProfileData profile={profile} status={status} updateUserStatus={updateUserStatus}/>
                }
            </div>
        </div>
    )
};

const ProfileData = ({profile, status, updateUserStatus}) => {
    return <div>
        <div className={s.fullName}>
            {profile.fullName}
        </div>
        <div className={s.status}>
            <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
        </div>
        <div className={s.aboutProfile}>
            <div>
                <b>About me: </b><span>{profile.aboutMe}</span>
            </div>
            <div>
                <b>Looking for a job: </b><span>{profile.lookingForAJob ? 'yes' : 'no'}</span>
            </div>
            {profile.lookingForAJob && <div>
                <b>Job description: </b><span>{profile.lookingForAJobDescription}</span>
            </div>}
            <div>
                <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactKey={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    </div>
}

const Contact = ({contactKey, contactValue}) => {
    return (
        <div>
            {contactValue &&
            <div className={s.contact}>
                <b>{contactKey}: </b> {contactValue}
            </div>
            }
        </div>
    )
};

export default Description;