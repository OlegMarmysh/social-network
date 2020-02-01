import {dialogsApi} from "../api/api";

const GET_DIALOGS_SUCCESS = 'social-network/dialogsPage/GET_DIALOGS_SUCCESS';
const GET_MESSAGES_SUCCESS = 'social-network/dialogsPage/GET_MESSAGES_SUCCESS';
const SET_CURRENT_DIALOG = 'social-network/dialogsPage/SET_CURRENT_DIALOG';
const SEND_MESSAGE_SUCCESS = 'social-network/dialogsPage/SEND_MESSAGE_SUCCESS';

let initialState = {
    dialogs: [],
    messages: [],
    selectedDialogId: null
};

const dialogsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DIALOGS_SUCCESS:
        case GET_MESSAGES_SUCCESS:
        case SET_CURRENT_DIALOG:
            return {
                ...state,
                ...action.payload
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: action.payload
            };
        default:
            return state;
    }
};


export const getDialogsSuccess = (dialogs) => ({type: GET_DIALOGS_SUCCESS, payload: {dialogs}});
export const getMessagesSuccess = (messages) => ({type: GET_MESSAGES_SUCCESS, payload: {messages}});
export const setCurrentDialog = (selectedDialogId) => ({type: GET_MESSAGES_SUCCESS, payload: {selectedDialogId}});


export const sendMessageSuccess = (message) => ({type: SEND_MESSAGE_SUCCESS, payload: {message}});

export const getDialogs = () => async (dispatch) => {
    let response = await dialogsApi.getDialogs();
    dispatch(getDialogsSuccess(response.data))
};
export const getMessages = (userId) => async (dispatch) => {
    let response = await dialogsApi.getMessages(userId);
    dispatch(getMessagesSuccess(response.data.items))
}

export const sendMessage = (userId, message) => async (dispatch) => {
    let response = await dialogsApi.sendMessage(userId, message);
    dispatch(sendMessageSuccess(message))
}

export default dialogsPageReducer;