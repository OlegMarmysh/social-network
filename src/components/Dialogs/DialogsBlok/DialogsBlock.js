import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogsBlock = (props) => {
    let path = '/Dialogs/' + props.id;
    return (
        <div className={s.dialogBlock}>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>

    )
}

export default DialogsBlock;