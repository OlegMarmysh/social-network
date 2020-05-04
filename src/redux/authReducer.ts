import { authAPI, profileAPI, securityAPI } from '../api/api'
import { FormAction, stopSubmit } from 'redux-form'
import { SET_USER_DATA, SET_CAPTCHA_SUCCESS, SET_AUTH_USER_PROFILE, authActions, Profile } from './authActions'
import { InferActionsType, AppState } from './reduxStore'
import { ThunkAction } from 'redux-thunk'

const initialState = {
  userId: null as string | null,
  login: null as string | null,
  email: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as string | null,
  profile: null as Profile | null
}

type AuthState = typeof initialState

type AuthActions = InferActionsType<typeof authActions>
const { setAuthUserData, setCaptchaSuccess, setAuthUserProfile } = authActions

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_SUCCESS:
    case SET_AUTH_USER_PROFILE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export type AuthThunkType = ThunkAction<Promise<void>, AppState, unknown, AuthActions>

export const getAuthUserProfile = (userId: string): AuthThunkType => async (dispatch) => {
  const response = await profileAPI.getUserProfile(userId)
  dispatch(setAuthUserProfile(response.data))
}

export const getAuthUserData = (): AuthThunkType => async (dispatch) => {
  const response = await authAPI.getAuthUserData()
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data
    dispatch(setAuthUserData(id, login, email, true))
  }
}
export const setCaptcha = (): AuthThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptcha()
  dispatch(setCaptchaSuccess(response.data.url))
}
export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string): ThunkAction<Promise<void>, AppState, unknown, AuthActions | FormAction> => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    await dispatch(getAuthUserData())
  } else {
    if (response.data.resultCode === 10) {
      await dispatch(setCaptcha())
    }
    const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
    dispatch(stopSubmit('login', { _error: message }))
  }
}
export const logout = (): AuthThunkType => async (dispatch) => {
  await authAPI.logout()
  dispatch(setAuthUserData(null, null, null, false))
}

export default authReducer
