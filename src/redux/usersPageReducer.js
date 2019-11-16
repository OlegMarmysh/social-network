import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS='SET_USERS';
const SET_PAGES='SET_PAGES';
const TOTAL_COUNT_USERS = 'TOTAL_COUNT_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [],
    totalCountUsers: 50,
    sizePage: 20,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId){
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId){
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_PAGES: {
            return  {
                ...state,
                currentPage: action.pageNumber
            }
        }
        case TOTAL_COUNT_USERS:{
            return {
                ...state,
                totalCountUsers: action.countUsers
            }
        }
        case TOGGLE_IS_FETCHING:{
            return  {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_IN_PROGRESS: {
            return  {
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

export const followSuccess = (userId) => ({type: FOLLOW,  userId});
export const unFollowSuccess = (userId) => ({type: UNFOLLOW,  userId});
export const setUsers = (users) => ({type: SET_USERS,  users});
export const setPages = (pageNumber) => ({type:SET_PAGES, pageNumber});
export const setTotalCountUsers = (countUsers) => ({type:TOTAL_COUNT_USERS,  countUsers});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setFollowingInProgress = (isFetching, userId) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId});

export const getUsers = (currentPage, sizePage) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        usersAPI.getUsers(currentPage, sizePage).then(data => {
            dispatch(setIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalCountUsers(data.totalCount))
        });
        dispatch(setPages(currentPage))
    }
};

export const unFollow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        usersAPI.unfollowUsers(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(unFollowSuccess(userId))
            }
            dispatch(setFollowingInProgress(false, userId));
        })
    }
};

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        usersAPI.followUsers(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(followSuccess(userId))
            }
            dispatch(setFollowingInProgress(false, userId));
        })
    }
};



export default usersPageReducer;