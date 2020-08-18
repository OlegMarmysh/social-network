import { User } from './usersPageReducer'

export const usersActions = {
  followSuccess: (userId: number) => ({
    type: 'SN/USERS/FOLLOW',
    userId
  } as const),
  unFollowSuccess: (userId: number) => ({
    type: 'SN/USERS/UNFOLLOW',
    userId
  } as const),
  setUsers: (users: Array<User>) => ({
    type: 'SN/USERS/SET_USERS',
    payload: { users }
  } as const),
  setPages: (pageNumber: number) => ({
    type: 'SN/USERS/SET_PAGES',
    pageNumber
  } as const),
  setTotalCountUsers: (countUsers: number) => ({
    type: 'SN/USERS/TOTAL_COUNT_USERS',
    countUsers
  } as const),
  setIsFetching: (isFetching: boolean) => ({
    type: 'SN/USERS/TOGGLE_IS_FETCHING',
    payload: { isFetching }
  } as const),
  setFollowingInProgress: (isFetching: boolean, userId: number) => ({
    type: 'SN/USERS/FOLLOWING_IN_PROGRESS',
    isFetching,
    userId
  } as const)
}
