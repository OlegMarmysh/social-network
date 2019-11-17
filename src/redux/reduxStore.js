import {applyMiddleware, combineReducers, createStore} from "redux";
import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";
import sideBarReducer from "./sideBarReducer";
import usersPageReducer from "./usersPageReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    sidebar: sideBarReducer,
    users: usersPageReducer,
    auth: authReducer,
    form: formReducer
});
let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;