import { Profile } from '../types'

export const authActions = {
  setAuthUserData: (userId: null | number, login: null | string,
    email: null | string, isAuth: boolean) => ({
    type: 'SN/AUTH/SET_USER_DATA',
    payload: { userId, login, email, isAuth }
  } as const),
  setCaptchaSuccess: (captchaUrl: string) => ({
    type: 'SN/AUTH/SET_CAPTCHA_SUCCESS',
    payload: { captchaUrl }
  } as const),
  setAuthUserProfile: (profile: Profile) => ({
    type: 'SN/AUTH/SET_AUTH_USER_PROFILE',
    payload: { profile }
  } as const)
}
