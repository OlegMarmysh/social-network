import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.post}>
            <div className={s.postContent}>
                <img src='https://avatarko.ru/img/kartinka/1/multfilm_gomer.png'/>
                {props.post}
                <div>
                    <span>Like {props.likeCounts}</span>
                    <button onClick={()=>{props.deletePost(props.postId)}}>X</button>
                </div>

            </div>

        </div>
    )
}

export default Post;