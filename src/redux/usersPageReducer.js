import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../components/utilits/objectsHelper";

const FOLLOW = 'social-network/userPage/FOLLOW';
const UNFOLLOW = 'social-network/userPage/UNFOLLOW';
const SET_USERS = 'social-network/userPage/SET_USERS';
const SET_PAGES = 'social-network/userPage/SET_PAGES';
const TOTAL_COUNT_USERS = 'social-network/userPage/TOTAL_COUNT_USERS';
const TOGGLE_IS_FETCHING = 'social-network/userPage/TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRESS = 'social-network/userPage/FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    totalCountItems: 50,
    sizePage: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionSize: 10
};

const usersPageReducer = (state = initialState, action) => {
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

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unFollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setPages = (pageNumber) => ({type: SET_PAGES, pageNumber});
export const setTotalCountUsers = (countUsers) => ({type: TOTAL_COUNT_USERS, countUsers});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setFollowingInProgress = (isFetching, userId) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId});

export const requestUsers = (currentPage, sizePage) => async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, sizePage);
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCountUsers(data.totalCount));
    dispatch(setPages(currentPage))
};

const followUnFollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    let response = await apiMethod;
    if (response.data.resultCode === 0) {
        dispatch(actionCreator)
    }
    dispatch(setFollowingInProgress(false, userId));
}

export const unFollow = (userId) => (dispatch) => {
    followUnFollowFlow(dispatch, userId, usersAPI.unfollowUsers(userId), unFollowSuccess(userId))
};

export const follow = (userId) => (dispatch) => {
    followUnFollowFlow(dispatch, userId, usersAPI.followUsers(userId), followSuccess(userId))
};


export default usersPageReducer;