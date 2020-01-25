import React from 'react'
import styles from "./Users.module.css";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = ({totalCountItems, portionSize, sizePage, currentPage, onSetPages, users, followingInProgress, unFollow, follow}) => {
    return (
        <div className={styles.wrapper}>
            <Paginator totalCountItems={totalCountItems} sizePage={sizePage}
                       currentPage={currentPage} onSetPages={onSetPages}
                       portionSize={portionSize}
            />
            <div className={styles.users}>
                {
                    users.map(u => <User userId={u.id} status={u.status} name={u.name} followed={u.followed}
                                         photos={u.photos}
                                         followingInProgress={followingInProgress}
                                         unFollow={unFollow}
                                         follow={follow}
                                         className={styles.users}/>)
                }
            </div>
        </div>
    )
};

export default Users;