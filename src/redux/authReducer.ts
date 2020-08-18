import { authAPI, profileAPI, securityAPI } from '../api/api'
import { FormAction, stopSubmit } from 'redux-form'
import { authActions } from './authActions'
import { BaseThunkType, InferActionsType } from './reduxStore'
import { Profile } from '../types'

const initialState = {
  userId: null as number | null,
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
    case 'SN/AUTH/SET_USER_DATA':
    case 'SN/AUTH/SET_CAPTCHA_SUCCESS':
    case 'SN/AUTH/SET_AUTH_USER_PROFILE': {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export type AuthThunkType = BaseThunkType<AuthActions>
export type LoginThunkType = BaseThunkType<AuthActions | FormAction>

export const getAuthUserProfile = (userId: number): AuthThunkType => async dispatch => {
  const response = await profileAPI.getUserProfile(userId)
  dispatch(setAuthUserProfile(response.data))
}

export const getAuthUserData = (): AuthThunkType => async dispatch => {
  const response = await authAPI.getAuthUserData()
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data
    dispatch(setAuthUserData(id, login, email, true))
  }
}
export const setCaptcha = (): AuthThunkType => async dispatch => {
  const response = await securityAPI.getCaptcha()
  dispatch(setCaptchaSuccess(response.data.url))
}
export const login = (email: string, password: string, rememberMe: boolean,
  captcha: string): LoginThunkType => async dispatch => {
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
export const logout = (): AuthThunkType => async dispatch => {
  await authAPI.logout()
  dispatch(setAuthUserData(null, null, null, false))
}

export default authReducer
