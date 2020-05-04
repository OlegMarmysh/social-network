import { dialogsApi } from '../api/api'

const GET_DIALOGS_SUCCESS = 'social-network/dialogsPage/GET_DIALOGS_SUCCESS'
const GET_MESSAGES_SUCCESS = 'social-network/dialogsPage/GET_MESSAGES_SUCCESS'
const SET_CURRENT_DIALOG = 'social-network/dialogsPage/SET_CURRENT_DIALOG'
const SEND_MESSAGE_SUCCESS = 'social-network/dialogsPage/SEND_MESSAGE_SUCCESS'
const PUT_UP_DIALOG = 'social-network/dialogsPage/PUT_UP_DIALOG'

const initialState = {
  dialogs: [],
  messages: [],
  selectedDialogId: null
}

const dialogsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIALOGS_SUCCESS:
    case GET_MESSAGES_SUCCESS:
    case SET_CURRENT_DIALOG:
      return {
        ...state,
        ...action.payload
      }
    case PUT_UP_DIALOG:
      return {
        ...state,
        dialogs: [state.dialogs.find((d) => d.id === action.userId), ...state.dialogs.filter(d => d.id !== action.userId)]
      }
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    default:
      return state
  }
}

export const getDialogsSuccess = (dialogs) => ({ type: GET_DIALOGS_SUCCESS, payload: { dialogs } })
export const getMessagesSuccess = (messages) => ({ type: GET_MESSAGES_SUCCESS, payload: { messages } })
export const putUpDialog = (userId) => ({ type: PUT_UP_DIALOG, userId })
export const setCurrentDialog = (selectedDialogId) => ({ type: GET_MESSAGES_SUCCESS, payload: { selectedDialogId } })

export const sendMessageSuccess = (message) => ({ type: SEND_MESSAGE_SUCCESS, message })

export const getDialogs = () => async (dispatch) => {
  const response = await dialogsApi.getDialogs()
  dispatch(getDialogsSuccess(response.data))
}
export const getMessages = (userId) => async (dispatch) => {
  const response = await dialogsApi.getMessages(userId)
  dispatch(getMessagesSuccess(response.data.items))
}
export const startDialog = (userId) => async (dispatch, getState) => {
  await dialogsApi.startDialog(userId)
  if (getState().dialogsPage.dialogs.find(d => d.id === userId)) {
    dispatch(putUpDialog(userId))
  } else {
    dispatch(getDialogs())
  }
}
export const sendMessage = (userId, message) => async (dispatch, getState) => {
  const response = await dialogsApi.sendMessage(userId, message)
  dispatch(sendMessageSuccess(response.data.data.message))
  if (getState().dialogsPage.dialogs.find(d => d.id === userId)) {
    dispatch(putUpDialog(userId))
  } else {
    dispatch(getDialogs())
  }
}

export const init = (userId) => async (dispatch) => {
  if (userId) {
    await dispatch(startDialog(userId))
    dispatch(getDialogs())
    dispatch(getMessages(userId))
    dispatch(setCurrentDialog(userId))
  } else {
    dispatch(getDialogs())
  }
}

export const update = (userId) => async (dispatch) => {
  dispatch(getMessages(userId))
  dispatch(setCurrentDialog(userId))
}

export default dialogsPageReducer
