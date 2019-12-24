import {profileAPI} from "../api/api";

const ADD_POST = 'social-network/profilePage/ADD_POST';
const SET_USER_PROFILE = 'social-network/profilePage/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network/profilePage/SET_USER_STATUS';
const DELETE_POST = 'social-network/profilePage/DELETE_POST';
const SAVE_PHOTO = 'social-network/profilePage/SAVE_PHOTO';

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
        case SAVE_PHOTO: {
            return  {
                ...state,
                profile: {...state.profile, photos: action.photos}
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
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO, photos});

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
export const savePhoto = (file) => async (dispatch) => {
    debugger
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode === 0){
        debugger
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};

export default profilePageReducer;


