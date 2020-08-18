import { profileAPI } from '../api/api'
import { FormAction, stopSubmit } from 'redux-form'
import { profileActions } from './profileActions'
import { Profile } from '../types'
import { BaseThunkType, InferActionsType } from './reduxStore'

type Post = {
  id: number
  post: string
  likeCounts: number
}

const initialState = {
  posts: [
    { id: 1, post: 'How are you my dear friends', likeCounts: 60 },
    { id: 2, post: 'Its my first project', likeCounts: 67 }
  ] as Array<Post>,
  profile: null as Profile | null,
  status: ''
}

type ProfileState = typeof initialState
type ProfileActions = InferActionsType<typeof profileActions>
type ProfileThunk = BaseThunkType<ProfileActions>
type SaveProfileThunk = BaseThunkType<ProfileActions | FormAction>

const profilePageReducer = (state: ProfileState = initialState, action: ProfileActions) => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST':
      const post = {
        id: 3, post: action.newTextPost, likeCounts: 0
      }
      return {
        ...state,
        posts: [...state.posts, post]
      }
    case 'SN/PROFILE/DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      }
    }
    case 'SN/PROFILE/SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile
      }
    }
    case 'SN/PROFILE/SET_USER_STATUS': {
      return {
        ...state,
        status: action.status
      }
    }
    case 'SN/PROFILE/SAVE_PHOTO': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos }
      }
    }
    default:
      return state
  }
}

const { savePhotoSuccess, setUserProfile, setUserStatus } = profileActions

export const getUserProfile = (userId: number | null): ProfileThunk => async dispatch => {
  const response = await profileAPI.getUserProfile(userId)
  dispatch(setUserProfile(response.data))
}
export const getUserStatus = (userId: number): ProfileThunk => async dispatch => {
  const response = await profileAPI.getUserStatus(userId)
  dispatch(setUserStatus(response.data))
}
export const updateUserStatus = (status: string): ProfileThunk => async dispatch => {
  const response = await profileAPI.updateUserStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status))
  } else {
    dispatch(setUserStatus(response.data.messages))
  }
}
export const savePhoto = (file: File): ProfileThunk => async dispatch => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}
export const saveProfile = (profile: Profile): SaveProfileThunk => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const response = await profileAPI.saveProfile(profile)
  if (response.data.resultCode === 0) {
    await dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }))
    return Promise.reject(response.data.messages[0])
  }
}

export default profilePageReducer
