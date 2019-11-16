import React from 'react';
import s from './Description.module.css';
import Preloader from "../../Common/Preloader/Preloader";

const Description = (props) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div className={s.description}>
            <div >
                <img src='http://loveopium.ru/content/2016/07/mongol/00s.jpg'/>
            </div>
            <div className={s.avatar}>
                <img src={props.profile.photos.large}/>
                ava+description
            </div>
        </div>
    )
}

export default Description;