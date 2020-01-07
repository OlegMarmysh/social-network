import React from 'react';
import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div className={s.navBarWrapper}>
            <div className={s.item}>
                <NavLink to='/Profile' activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Dialogs' activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Users' activeClassName={s.activeLink}>Users</NavLink>
            </div>
        </div>
    )
}

export default NavBar;