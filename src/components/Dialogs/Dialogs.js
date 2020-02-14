import React, {useState} from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog";

const Dialogs = (props) => {
    const [message, setMessage] = useState('');
    const sendMessage = () => {
        props.sendMessage(props.selectedDialogId, message);
        setMessage('');
    };
    return (
        <div className={s.dialogs}>
            <div>
                <h3>Dialogs</h3>
                {props.dialogs.map(d => <Dialog key={d.id} dialogId={d.id} userName={d.userName} photos={d.photos.small}
                                                dialogDate={d.lastDialogActivityDate}
                />)}
            </div>
            <div className={s.messages}>
                <h3>Messages</h3>
                {!props.selectedDialogId && <div className={s.preTitle}>Please select dialog</div>}
                {
                    props.selectedDialogId &&
                    <div className={s.messagesBlock}>
                        <div>
                            {(props.messages.length > 0) ? props.messages.map(m => <div key={m.id}
                                                                                        className={s.message}>
                                <div>
                                    {m.senderName}
                                </div>
                                <div>
                                    {m.body}
                                </div>
                            </div>) : <span>No messages</span>}
                        </div>
                        <div>
                            <textarea value={message} onChange={(e) => {
                                setMessage(e.currentTarget.value)
                            }} rows="3"/>
                            <div>
                                <button onClick={() => {
                                    sendMessage()
                                }}>Send
                                </button>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
};

export default Dialogs;