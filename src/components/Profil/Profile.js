import React from 'react';
import Description from "./Description/Description";
import MyPostContainer from "./MyPost/MyPostContainer";
import s from "./Profile.module.css"

const Profile = (props) => {
    return (
        <div className={s.profileContent}>
            <div className={s.descriptionContent}>
                <Description profile={props.profile} status={props.status}
                             updateUserStatus={props.updateUserStatus} isOwner={props.isOwner}
                             savePhoto={props.savePhoto}
                             saveProfile={props.saveProfile}
                />
            </div>
            <div className={s.myPostContent}>
                <MyPostContainer/>
            </div>
        </div>
    )
}

export default Profile;