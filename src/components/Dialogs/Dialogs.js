import React from 'react';
import s from './Dialogs.module.css';
import DialogsBlock from "./DialogsBlok/DialogsBlock";
import MessagesBlock from "./MessagesBlock/MessagesBlock";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../utilits/validators";
import {Textarea} from "../Common/FormsControl";

const maxLength30 = maxLengthCreator(30);

const Dialogs = (props) => {
    let dialogsElements = props.dialogs.map(d => <DialogsBlock name={d.name} id={d.id}/>);
    let messagesElements = props.messages.map(m => <MessagesBlock message={m.message}/>);

    let onAddMessage = (values) => {
        props.sendMessage(values.newTextMessage);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messagesItems}>
                {messagesElements}
                <AddMessageForm onSubmit={onAddMessage}/>
            </div>
        </div>
    )
};

let AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newTextMessage' component={Textarea} validate={[required, maxLength30]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

AddMessageForm=reduxForm({form: 'AddMessageFormDialogs'})(AddMessageForm);

export default Dialogs;