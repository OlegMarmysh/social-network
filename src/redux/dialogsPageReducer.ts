import { dialogsApi } from '../api/api'
import { BaseThunkType, InferActionsType } from './reduxStore'
import { dialogsActions } from './dialogsActions'
import { Dialogs, Messages } from '../types'

const initialState = {
  dialogs: [] as Array<Dialogs>,
  messages: [] as Array<Messages>,
  selectedDialogId: null as number | null
}

type DialogsInitialState = typeof initialState
type DialogsActionsType = InferActionsType<typeof dialogsActions>
type DialogsThunkType = BaseThunkType<DialogsActionsType>

const dialogsPageReducer = (state: DialogsInitialState = initialState,
  action: DialogsActionsType) => {
  switch (action.type) {
    case 'SN/DIALOGS/GET_DIALOGS_SUCCESS':
    case 'SN/DIALOGS/GET_MESSAGES_SUCCESS':
    case 'SN/DIALOGS/SET_CURRENT_DIALOG':
      return {
        ...state,
        ...action.payload
      }
    case 'SN/DIALOGS/PUT_UP_DIALOG':
      return {
        ...state,
        dialogs: [state.dialogs.find(d => d.id === action.userId),
          ...state.dialogs.filter(d => d.id !== action.userId)]
      }
    case 'SN/DIALOGS/SEND_MESSAGE_SUCCESS':
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    default:
      return state
  }
}

const {
  getDialogsSuccess, getMessagesSuccess, putUpDialog,
  sendMessageSuccess, setCurrentDialog
} = dialogsActions

export const getDialogs = (): DialogsThunkType => async dispatch => {
  const response = await dialogsApi.getDialogs()
  dispatch(getDialogsSuccess(response.data))
}
export const getMessages = (userId: number): DialogsThunkType => async dispatch => {
  const response = await dialogsApi.getMessages(userId)
  dispatch(getMessagesSuccess(response.data.items))
}
export const startDialog = (userId: number): DialogsThunkType => async (dispatch, getState) => {
  await dialogsApi.startDialog(userId)
  // @ts-ignore
  if (getState().dialogsPage.dialogs.find((d: Dialogs) => d.id === userId)) {
    dispatch(putUpDialog(userId))
  } else {
    dispatch(getDialogs())
  }
}
export const sendMessage = (userId: number,
  message: string): DialogsThunkType => async (dispatch, getState) => {
  const response = await dialogsApi.sendMessage(userId, message)
  dispatch(sendMessageSuccess(response.data.data.message))
  // @ts-ignore
  if (getState().dialogsPage.dialogs.find((d: Dialogs) => d.id === userId)) {
    dispatch(putUpDialog(userId))
  } else {
    dispatch(getDialogs())
  }
}

export const init = (userId: number): DialogsThunkType => async dispatch => {
  if (userId) {
    await dispatch(startDialog(userId))
    dispatch(getDialogs())
    dispatch(getMessages(userId))
    dispatch(setCurrentDialog(userId))
  } else {
    dispatch(getDialogs())
  }
}

export const update = (userId: number): DialogsThunkType => async (dispatch) => {
  dispatch(getMessages(userId))
  dispatch(setCurrentDialog(userId))
}

export default dialogsPageReducer
