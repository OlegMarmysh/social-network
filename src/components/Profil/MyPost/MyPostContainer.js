import React from 'react';
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {addPost, updatePost} from "../../../redux/profilePageReducer";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newTextPost: state.profilePage.newTextPost
    }
};

const MyPostContainer = connect (mapStateToProps, {addPost, updatePost}) (MyPost);

export default MyPostContainer;