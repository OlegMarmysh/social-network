import React from 'react';
import s from './Dialogs.module.css';
import DialogsBlock from "./DialogsBlok/DialogsBlock";
import MessagesBlock from "./MessagesBlock/MessagesBlock";
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {
    let dialogsElements=props.dialogs.map(d=><DialogsBlock name={d.name} id={d.id}/>);
    let messagesElements=props.messages.map(m=><MessagesBlock message={m.message}/>);

    let onAddMessage= () => {
        props.sendMessage();
    }

    let onUpdateMessage = (e)=> {
        let message=e.target.value;
        props.updateMessage(message);
    };
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <textarea onChange={onUpdateMessage} value={props.newTextMessage}></textarea>
                <button onClick={onAddMessage}>Send</button>
            </div>
        </div>
    )
}

export default Dialogs;