import {applyMiddleware, combineReducers, createStore} from "redux";
import profilePageReducer from "./profilePageReducer";
import dialogsPageReducer from "./dialogsPageReducer";
import usersPageReducer from "./usersPageReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";

let RootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    users: usersPageReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducer = typeof RootReducer
export type AppState = ReturnType<RootReducer>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesTypes<T>>

let store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;