import React from 'react';
import s from './Description.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../images/users-vector-icon-png_260862.jpg";

const Description = ({profile, status, updateUserStatus, isOwner, savePhoto}) => {
    debugger
    if (!profile) {
        return <Preloader/>
    }
    let onChooseAvatar = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };
    return (
        <div className={s.description}>
            <div>
                <img src='http://loveopium.ru/content/2016/07/mongol/00s.jpg'/>
            </div>
            <div className={s.avatar}>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner && <input type={'file'} onChange={onChooseAvatar}/>}
                <div>
                    <b>Full Name: </b>{profile.fullName}
                </div>
                <div>
                    <b>About me: </b>{profile.aboutMe}
                </div>
                <div>
                    <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                {profile.lookingForAJob && <div>
                    <b>Looking for a job description: </b>{profile.lookingForAJobDescription}
                </div>}
                <div>
                    <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                        return <Contact key={key} contactKey={key} contactValue={profile.contacts[key]}/>
                })}
                </div>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
};

const Contact = ({contactKey, contactValue}) => {
    return (
        <div className={s.contact} >
            <b>{contactKey}: </b> {contactValue}
        </div>
    )
};

export default Description;