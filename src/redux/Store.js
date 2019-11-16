import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";
import sideBarReducer from "./sideBarReducer";


let store = {
    _State: {
        profilePage: {
            posts: [
                {id: '1', post: 'How are you my dear friends', likeCounts: '60'},
                {id: '2', post: 'Its my first project', likeCounts: '67'}
            ],
            newTextPost: ''
        },
        dialogsPage: {
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
        },
        sidebar: {
            friends: [
                {name: 'Vika'},
                {name: 'Olga'},
                {name: 'Boris'}
            ]

        }
    },
    _rerenderEntireTree() {

    },

    getState() {
        return this._State
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },

    dispatch(action) {
        this._State.profilePage = profilePageReducer(this._State.profilePage, action)
        this._State.dialogsPage = dialogsPageReducer(this._State.dialogsPage, action)
        this._State.sidebar = sideBarReducer(this._State.sidebar, action)
        this._rerenderEntireTree(this._State)
        }
    }

window.store = store;

export default store;