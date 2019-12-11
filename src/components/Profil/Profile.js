import React from 'react';
import Description from "./Description/Description";
import MyPostContainer from "./MyPost/MyPostContainer";

const Profile = (props) => {
    return (
        <div>
            <Description profile = {props.profile} status={props.status}
                         updateUserStatus={props.updateUserStatus} isOwner={props.isOwner}
                         savePhoto={props.savePhoto}

            />
            <MyPostContainer/>
        </div>
    )
}

export default Profile;