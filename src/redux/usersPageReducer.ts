import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../components/utilits/objectsHelper";
import {
    FOLLOW,
    FOLLOWING_IN_PROGRESS,
    SET_PAGES,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    TOTAL_COUNT_USERS,
    UNFOLLOW, userActions, User
} from "./userActions";
import {AppState, InferActionsType} from "./reduxStore";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

type UsersState = typeof initialState

let initialState = {
    users: [] as Array<User>,
    totalCountItems: 50,
    sizePage: 12,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<string>,
    portionSize: 10
};

type UsersActions = InferActionsType<typeof userActions>
const { followSuccess, unFollowSuccess, setFollowingInProgress,
        setIsFetching, setPages, setTotalCountUsers, setUsers } = userActions

const usersPageReducer = (state = initialState, action: UsersActions): UsersState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_PAGES: {
            return {
                ...state,
                currentPage: action.pageNumber
            }
        }
        case TOTAL_COUNT_USERS: {
            return {
                ...state,
                totalCountItems: action.countUsers
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
};

type UsersThunkType = ThunkAction<Promise<void>, AppState, unknown, UsersActions>
export const requestUsers = (currentPage: number, sizePage: number): UsersThunkType => async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, sizePage);
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCountUsers(data.totalCount));
    dispatch(setPages(currentPage))
};

const followUnFollowFlow = async (
    dispatch: Dispatch<UsersActions>, userId: string, apiMethod: any, actionCreator: UsersActions) => {
    let response = await apiMethod;
    if (response.data.resultCode === 0) {
        dispatch(actionCreator)
    }
    dispatch(setFollowingInProgress(false, userId));
}

export const unFollow = (userId: string): ThunkAction<void, AppState, unknown, UsersActions> => (dispatch) => {
    followUnFollowFlow(dispatch, userId, usersAPI.unfollowUsers(userId), unFollowSuccess(userId))
};

export const follow = (userId: string): ThunkAction<void, AppState, unknown, UsersActions> => (dispatch) => {
    followUnFollowFlow(dispatch, userId, usersAPI.followUsers(userId), followSuccess(userId))
};


export default usersPageReducer;