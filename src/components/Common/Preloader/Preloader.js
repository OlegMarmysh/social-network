import React from 'react';
import preloader from "../../../images/reload.svg";
import style from "./Preloader.module.css"

let Preloader = (props) => {
    return (
        <div className={style.wrapper}>
            <img src={preloader}/>
        </div>
        )

};

export default Preloader;