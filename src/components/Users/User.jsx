import React from 'react'
import styles from "./User.module.css";
import userPhoto from "../../images/users-vector-icon-png_260862.jpg";
import {NavLink} from "react-router-dom";

let User = ({userId, photos, followed, name, status, followingInProgress, unFollow, follow}) => {
    return (
        <div className={styles.user}>
            <div>
                <NavLink to={`/profile/${userId}`}>
                    <img className={styles.photo} src={photos.small !== null ? photos.small : userPhoto}/>
                </NavLink>
            </div>
            <div>
                {followed ? <button disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                        unFollow(userId)
                    }}>Unfollow</button> :
                    <button disabled={followingInProgress.some(id => id === userId)} onClick={() => {
                        follow(userId)
                    }}>Follow</button>}
            </div>
            <span>
                        <div>
                            {name}
                        </div>
                        <div className={styles.status}>
                            {status}
                        </div>
                    </span>
        </div>
    )
};

export default User;