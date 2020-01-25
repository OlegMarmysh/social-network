import React from 'react';
import s from './Mypost.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../Common/FormsControl";
import {maxLengthCreator, required} from "../../utilits/validators";

const maxLength20 = maxLengthCreator(20);

const MyPost = React.memo((props) => {
    console.log('render');
    let postsElements = props.posts.map(p => <Post deletePost = {props.deletePost} postId={p.id} post={p.post} likeCounts={p.likeCounts}/>);

    let onAddPost = (values) => {
        props.addPost(values.newTextPost);
    };
    return (
        <div className={s.MyPost}>
            <AddMessageForm onSubmit={onAddPost}/>
            <div className={s.Posts}>
                {postsElements}
            </div>
        </div>
    )
});

let AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.addMessageForm}>
            <div className={s.inputContent}>
                <Field name='newTextPost' component={Input} validate={[required, maxLength20]} placeholder={'Add new post'}/>
            </div>
            <div>
                <button>Add</button>
            </div>
        </form>
    )
};

AddMessageForm=reduxForm({form: 'ProfileAddMessageForm'})(AddMessageForm);

export default MyPost;