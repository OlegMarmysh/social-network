import { Profile, Photos } from '../types'

export const profileActions = {
  addPost: (newTextPost: string) => ({
    type: 'SN/PROFILE/ADD_POST',
    newTextPost
  } as const),
  setUserProfile: (profile: Profile) => ({
    type: 'SN/PROFILE/SET_USER_PROFILE',
    profile
  } as const),
  setUserStatus: (status: string) => ({
    type: 'SN/PROFILE/SET_USER_STATUS',
    status
  } as const),
  deletePost: (postId: number) => ({
    type: 'SN/PROFILE/DELETE_POST',
    postId
  } as const),
  savePhotoSuccess: (photos: Photos) => ({
    type: 'SN/PROFILE/SAVE_PHOTO',
    photos
  } as const)
}
