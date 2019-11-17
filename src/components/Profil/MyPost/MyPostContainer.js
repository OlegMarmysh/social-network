import React from 'react';
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {addPost} from "../../../redux/profilePageReducer";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newTextPost: state.profilePage.newTextPost
    }
};

const MyPostContainer = connect (mapStateToProps, {addPost}) (MyPost);

export default MyPostContainer;