import {profileAPI} from "../api/api";

const ADD_POST = 'social-network/profilePage/ADD_POST';
const SET_USER_PROFILE = 'social-network/profilePage/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network/profilePage/SET_USER_STATUS';
const DELETE_POST = 'social-network/profilePage/DELETE_POST';

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
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
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
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserProfile(userId);
    dispatch(setUserProfile(response.data));
};
export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(response.data))
};
export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateUserStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    } else {
        dispatch(setUserStatus(response.data.messages))
    }
};

export default profilePageReducer;


