import React from 'react';
import Friends from "./Friends/Friends";
import s from './Sidebar.module.css'

const Sidebar = (props) => {
    let friendsElement = props.friends.map(friend => <Friends name={friend.name}/>);
    return (
        <div className={s.sidebar}>
            <span>Friends</span>
            <div >
            {friendsElement}
            </div>
        </div>
    )
}

export default Sidebar;