import React, { useEffect, useState } from 'react'
import s from './Dialogs.module.css'
import Dialog from './Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { init, sendMessage, update } from '../../redux/dialogsPageReducer'
import { useRouteMatch } from 'react-router-dom'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

const Dialogs = () => {
  const dispatch = useDispatch()
  const match = useRouteMatch()
  const dialogs = useSelector(state => state.dialogsPage.dialogs)
  const messages = useSelector(state => state.dialogsPage.messages)
  const selectedDialogId = useSelector(state => state.dialogsPage.selectedDialogId)
  const [message, setMessage] = useState('')
  useEffect(() => {
    dispatch(init(match.params.userId))
  }, [])
  useEffect(() => {
    dispatch(update(match.params.userId))
  }, [match.params.userId])
  const onSendMessage = () => {
    dispatch(sendMessage(selectedDialogId, message))
    setMessage('')
  }
  return (
    <div className={s.dialogs}>
      <div>
        <h3>Dialogs</h3>
        {dialogs.map(d => <Dialog key={d.id} dialogId={d.id} userName={d.userName} photos={d.photos.small}
          dialogDate={d.lastDialogActivityDate}
        />)}
      </div>
      <div className={s.messages}>
        <h3>Messages</h3>
        {!selectedDialogId && <div className={s.preTitle}>Please select dialog</div>}
        {
          selectedDialogId &&
                    <div className={s.messagesBlock}>
                      <div>
                        {(messages.length > 0) ? messages.map(m => <div key={m.id}
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
                          <button onClick={onSendMessage}>Send</button>
                        </div>
                      </div>

                    </div>
        }
      </div>
    </div>
  )
}

export default withAuthRedirect(Dialogs)
