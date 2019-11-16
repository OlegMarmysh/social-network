const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

let initialState = {
    dialogs: [
        {id: '1', name: 'Pasha'},
        {id: '2', name: 'Oleg'},
        {id: '3', name: 'Nastya'},
        {id: '4', name: 'Alex'},
        {id: '5', name: 'John'}
    ],
    messages: [
        {id: '1', message: 'Hello my dear friend'},
        {id: '2', message: 'How are you, BRO'},
        {id: '3', message: 'Where is my socks'}
    ],
    newTextMessage: ''
}

const dialogsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let message = {
                id: '4', message: state.newTextMessage
            };
            return {
                ...state,
                messages: [...state.messages, message],
                newTextMessage: ''
            };
        case UPDATE_MESSAGE:
            return {
                ...state,
                newTextMessage: action.newTextMessage
            };
        default:
            return state;
    }
};

export const sendMessage = () => ({type: SEND_MESSAGE});
export const updateMessage = (message) => ({type: UPDATE_MESSAGE, newTextMessage: message});

export default dialogsPageReducer;