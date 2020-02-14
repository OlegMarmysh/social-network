import React from 'react'
import {NavLink} from "react-router-dom";
import style from './Dialog.module.css'

const Dialog = (props) => {
    return (
        <div className={style.dialog}>
            <NavLink to={`/dialogs/${props.dialogId}`} activeClassName={style.activeLink}>
                <div>
                    {props.userName}
                </div>
            </NavLink>
        </div>
    )
};

export default Dialog;