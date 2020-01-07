import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import Navbar from "./Navbar/NavBar";
import userPhoto from "../../images/users-vector-icon-png_260862.jpg";
import Preloader from "../Common/Preloader/Preloader";

const Header = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={s.header}>
            <div className={s.headerContent}>
                <img src='https://avatanplus.com/files/resources/mid/5cd273c518f1216a961439ee.png'/>
                <div>
                    <Navbar/>
                </div>
                <div className={s.loginWrapper}>
                    {props.isAuth ?
                        (  <div className={s.loginContent}>
                                <img src={props.profile.photos.small || userPhoto} alt="profile Photo"/>
                                <div><span style={{color: '#fffffe', fontWeight: 'bold', fontSize: '14px'}}>{props.login}</span><a onClick={props.logout}>Log out</a></div>
                            </div>
                        ) :
                        <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </div>
        </div>
    )
};

export default Header;