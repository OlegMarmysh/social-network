import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    debugger
    return (
        <div className={s.header}>
            <img src='https://avatanplus.com/files/resources/mid/5cd273c518f1216a961439ee.png'/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>: <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    )
};

export default Header;