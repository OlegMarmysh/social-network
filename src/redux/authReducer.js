import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const SET_CAPTCHA_SUCCESS = 'social-network/auth/SET_CAPTCHA_SUCCESS';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_SUCCESS:
            {
            return {
                ...state,
                ...action.payload,
            }
        }
        default:
            return state;
    }
};
export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, login, email, isAuth}
});
export const setCaptchaSuccess = (captchaUrl) => ({
    type: SET_CAPTCHA_SUCCESS,
    payload: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.getAuthUserData();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true))
    }
};
export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10){
            dispatch(setCaptcha())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
};
export const logout = () => async (dispatch) => {
        await authAPI.logout();
        dispatch(setAuthUserData(null, null, null, false))
};

export const setCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha();
    dispatch(setCaptchaSuccess(response.data.url))
};


export default authReducer;