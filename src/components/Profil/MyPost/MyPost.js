import React from 'react';
import s from './Mypost.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";

const MyPost = (props) => {
    let postsElements = props.posts.map(p => <Post post={p.post} likeCounts={p.likeCounts}/>);

    let onAddPost = (values) => {
        props.addPost(values.newTextPost);
    };

    return (
        <div className={s.MyPost}>
            <h3>My posts</h3>
            <AddMessageForm onSubmit={onAddPost}/>
            <div className={s.Posts}>
                {postsElements}
            </div>
        </div>
    )
};

let AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newTextPost' component='textarea'/>
            </div>
            <div>
                <button>Add</button>
            </div>
        </form>
    )
};

AddMessageForm=reduxForm({form: 'ProfileAddMessageForm'})(AddMessageForm);

export default MyPost;