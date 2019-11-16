import React from 'react';
import s from './Friends.module.css'

const Friends = (props) => {
    return (
        <div className={s.listFriends}>
            <div>
            <img src='http://www.gamer.ru/system/attached_images/images/000/412/647/original/awesome_smiley___engineer_tf2_by_sitic.png'/>
            </div>
            <div className={s.name}>
                {props.name}
            </div>
        </div>
    )
}

export default Friends;