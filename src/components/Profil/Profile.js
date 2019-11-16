import React from 'react';
import Description from "./Description/Description";
import MyPostContainer from "./MyPost/MyPostContainer";

const Profile = (props) => {
    return (
        <div>
            <Description profile = {props.profile}/>
            <MyPostContainer/>
        </div>
    )
}

export default Profile;