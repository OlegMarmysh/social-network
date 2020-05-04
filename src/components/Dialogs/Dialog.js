import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Dialog.module.css'
import photo from '../../images/users-vector-icon-png_260862.jpg'

const Dialog = (props) => {
  return (
    <div className={style.dialog}>
      <NavLink to={`/dialogs/${props.dialogId}`} activeClassName={style.activeLink}>
        <div>
          <img src={props.photos || photo} alt=""/>
        </div>
        <div>
          {props.userName}
        </div>
      </NavLink>
    </div>
  )
}

export default Dialog
