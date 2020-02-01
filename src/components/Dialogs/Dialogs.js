import React, {useState} from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog";

const Dialogs = (props) => {
    const [message, setMessage] = useState('');
    const sendMessage = () => {
        props.sendMessage(props.selectedDialogId, message);
        setMessage('');
    }
    return (
        <div className={s.dialogs}>
            <div>
                <h3>Dialogs</h3>
                {props.dialogs.map(d => <Dialog key={d.id} dialogId={d.id} userName={d.userName}/>)}
            </div>
            <div>
                <h3>Messages</h3>
                {!props.selectedDialogId && <div>Please select dialog</div> }
                {
                    props.selectedDialogId &&
                    <div>
                        {props.messages.map(m=> <div key = {m.id}>{m.senderName}: {m.body}</div>)}
                        <div>
                            <textarea value={message} onChange={(e) => {
                                setMessage(e.currentTarget.value)
                            }} rows="5"/>
                        </div>
                        <div>
                            <button onClick={() => {sendMessage()}}>Send</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};


export default Dialogs;