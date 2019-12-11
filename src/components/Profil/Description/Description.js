import React from 'react';
import s from './Description.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../images/users-vector-icon-png_260862.jpg";

const Description = ({profile, status, updateUserStatus, isOwner, savePhoto}) => {
    if (!profile){
        return <Preloader/>
    }
    let onChooseAvatar = (e) => {
        if(e.target.files.length){
            savePhoto(e.target.files[0].name)
        }
};
    return (
        <div className={s.description}>
            <div >
                <img src='http://loveopium.ru/content/2016/07/mongol/00s.jpg'/>
            </div>
            <div className={s.avatar}>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner && <input type={'file'} onChange={onChooseAvatar}/>}
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

export default Description;