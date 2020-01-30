import React from 'react';
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {addPost, deletePost} from "../../../redux/profilePageReducer";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newTextPost: state.profilePage.newTextPost,
        profile: state.profilePage.profile
    }
};

const MyPostContainer = connect (mapStateToProps, {addPost, deletePost}) (MyPost);

export default MyPostContainer;