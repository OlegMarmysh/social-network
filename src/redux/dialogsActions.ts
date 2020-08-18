import { Dialogs, Messages } from '../types'

export const dialogsActions = {
  getDialogsSuccess: (dialogs: Array<Dialogs>) => ({
    type: 'SN/DIALOGS/GET_DIALOGS_SUCCESS',
    payload: { dialogs }
  } as const),
  getMessagesSuccess: (messages: Array<Messages>) => ({
    type: 'SN/DIALOGS/GET_MESSAGES_SUCCESS',
    payload: { messages }
  } as const),
  putUpDialog: (userId: number) => ({
    type: 'SN/DIALOGS/PUT_UP_DIALOG',
    userId
  } as const),
  setCurrentDialog: (selectedDialogId: number | null) => ({
    type: 'SN/DIALOGS/SET_CURRENT_DIALOG',
    payload: { selectedDialogId }
  } as const),
  sendMessageSuccess: (message: string) => ({
    type: 'SN/DIALOGS/SEND_MESSAGE_SUCCESS',
    message
  } as const)

}
