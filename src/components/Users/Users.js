import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../images/users-vector-icon-png_260862.jpg";
import {NavLink} from "react-router-dom";

let Users = (props) => {
    let countPages = Math.ceil(props.totalCountUsers / props.sizePage);
    let pages = [];
    for (let i = 1; i <= countPages; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && styles.usersPage} onClick={() => {
                        props.onSetPages(p)
                    }}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id} className={styles.users}>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                            <img className={styles.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ? <button disabled={props.followingInProgress.some(id=> id === u.id)} onClick={() => {
                          props.unFollow(u.id)
                        }}>Unfollow</button> : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                           props.follow(u.id)
                        }}>Follow</button>}
                    </div>
                    <span>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.status}
                        </div>
                    </span>
                    <span>
                        <div>
                            {'u.location.country'}
                        </div>
                        <div>
                            {'u.location.city'}
                        </div>
                    </span>
                </div>)
            }
        </div>
    )
};

export default Users;