import React from 'react';
import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";
import SidebarContainer from "../Sidebar/SidebarContainer";

const NavBar = () => {
    return (
        <div className={s.nav}>
            <div className={s.item}>
                <NavLink to='/Profile' activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Dialogs'activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news'activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Music'activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Settings'activeClassName={s.activeLink}>Settings</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/Users'activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div>
                <SidebarContainer/>
            </div>
        </div>
    )
}

export default NavBar;