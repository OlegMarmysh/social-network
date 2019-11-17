import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: '1', post: 'How are you my dear friends', likeCounts: '60'},
        {id: '2', post: 'Its my first project', likeCounts: '67'}
    ],
    profile: null,
    status: ''
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let post = {
                id: '3', post: action.newTextPost, likeCounts: '0'
            }
            return {
                ...state,
                posts: [...state.posts, post],
            };
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
};

export const addPost = (newTextPost) => ({type: ADD_POST, newTextPost});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getUserProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        })
    }
};
export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then(response =>
            dispatch(setUserStatus(response.data)))
    }
};
export const updateUserStatus = (status) => {
    return(dispatch) => {
        profileAPI.updateUserStatus(status)
            .then(response =>
            dispatch(setUserStatus(response.data.messages)))
    }
};

export default profilePageReducer;