import React from 'react';
import s from './Description.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const Description = ({profile, status, updateUserStatus}) => {
    if (!profile){
        return <Preloader/>
    }
    return (
        <div className={s.description}>
            <div >
                <img src='http://loveopium.ru/content/2016/07/mongol/00s.jpg'/>
            </div>
            <div className={s.avatar}>
                <img src={profile.photos.large}/>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
}

export default Description;