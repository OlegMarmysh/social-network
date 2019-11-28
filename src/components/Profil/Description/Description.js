import React from 'react';
import s from './Description.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const Description = (props) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div className={s.description}>
            <div >
                <img src='http://loveopium.ru/content/2016/07/mongol/00s.jpg'/>
            </div>
            <div className={s.avatar}>
                <img src={props.profile.photos.large}/>
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
}

export default Description;