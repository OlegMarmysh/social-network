import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../components/utilits/objectsHelper'
import { usersActions } from './usersActions'
import { AppState, InferActionsType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'

export type User = {
  id: number
  name: string
  status: string
  photos: { small: string | null, large: string | null }
  followed: boolean
}

const initialState = {
  users: [] as Array<User>,
  totalCountItems: 50,
  sizePage: 12,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  portionSize: 10
}

type UsersState = typeof initialState
type UsersActions = InferActionsType<typeof usersActions>

const {
  followSuccess, unFollowSuccess, setFollowingInProgress,
  setIsFetching, setPages, setTotalCountUsers, setUsers
} = usersActions

const usersPageReducer = (state = initialState, action: UsersActions): UsersState => {
  switch (action.type) {
    case 'SN/USERS/SET_USERS':
    case 'SN/USERS/TOGGLE_IS_FETCHING': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
      }
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
      }
    case 'SN/USERS/SET_PAGES': {
      return {
        ...state,
        currentPage: action.pageNumber
      }
    }
    case 'SN/USERS/TOTAL_COUNT_USERS': {
      return {
        ...state,
        totalCountItems: action.countUsers
      }
    }
    case 'SN/USERS/FOLLOWING_IN_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    default:
      return state
  }
}

type UsersThunkType = ThunkAction<Promise<void>, AppState, unknown, UsersActions>
export const requestUsers = (currentPage: number,
  sizePage: number): UsersThunkType => async (dispatch) => {
  dispatch(setIsFetching(true))
  const data = await usersAPI.getUsers(currentPage, sizePage)
  dispatch(setIsFetching(false))
  dispatch(setUsers(data.items))
  dispatch(setTotalCountUsers(data.totalCount))
  dispatch(setPages(currentPage))
}

const followUnFollowFlow = async (
  dispatch: Dispatch<UsersActions>, userId: number, apiMethod: any, actionCreator: UsersActions) => {
  const response = await apiMethod
  if (response.data.resultCode === 0) {
    dispatch(actionCreator)
  }
  dispatch(setFollowingInProgress(false, userId))
}

export const unFollow = (userId: number): ThunkAction<void, AppState, unknown, UsersActions> => (dispatch) => {
  followUnFollowFlow(dispatch, userId, usersAPI.unfollowUsers(userId), unFollowSuccess(userId))
}

export const follow = (userId: number): ThunkAction<void, AppState, unknown, UsersActions> => (dispatch) => {
  followUnFollowFlow(dispatch, userId, usersAPI.followUsers(userId), followSuccess(userId))
}

export default usersPageReducer
