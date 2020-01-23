import React from 'react';
import s from './Post.module.css';

const Post =(props) =>{
    return(
        <div className={s.post}>
            <div >
                <img src='https://avatarko.ru/img/kartinka/1/multfilm_gomer.png'/>
                {props.post}
                <div>
                    <span>Like {props.likeCounts}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;