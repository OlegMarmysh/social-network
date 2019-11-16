import React from 'react';
import s from './Mypost.module.css';
import Post from "./Post/Post";

const MyPost = (props) => {
    let postsElements = props.posts.map(p => <Post post={p.post} likeCounts={p.likeCounts}/>);

    let onAddPost = () => {
        props.addPost();
    }

    let onUpdatePost = (e) => {
        let text = e.target.value;
        props.updatePost(text);
    }
    return (
        <div className={s.MyPost}>
            <h3>My posts</h3>
            <div>
                <textarea onChange={onUpdatePost} value={props.newTextPost}></textarea>
            </div>
            <div>
                <button onClick={onAddPost}>Add</button>
        </div>
            <div className={s.Posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPost;