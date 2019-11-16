import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_POST = 'UPDATE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        {id: '1', post: 'How are you my dear friends', likeCounts: '60'},
        {id: '2', post: 'Its my first project', likeCounts: '67'}
    ],
    newTextPost: '',
    profile: null
}

const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let post = {
                id: '3', post: state.newTextPost, likeCounts: '0'
            }
            return {
                ...state,
                posts: [...state.posts, post],
                newTextPost: ''
            };
        case UPDATE_POST:
            return {
                ...state,
                newTextPost: action.newTextPost
            };
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
            }
        }


export const addPost = () => ({type: ADD_POST});
export const updatePost = (text) => ({type: UPDATE_POST, newTextPost: text});
export const setUserProfile = (profile) => ({type:SET_USER_PROFILE, profile});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getUserProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        })
    }
};

export default profilePageReducer;