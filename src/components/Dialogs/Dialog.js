import React from 'react'
import {NavLink} from "react-router-dom";

const Dialog = (props) => {
    return (
        <div>
            <NavLink to={`/dialogs/${props.dialogId}`}>{props.userName}</NavLink>
        </div>
    )
};

export default Dialog;