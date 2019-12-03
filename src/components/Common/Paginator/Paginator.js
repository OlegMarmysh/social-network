import React from 'react'
import styles from "./Paginator.module.css";

let Paginator = ({totalCountUsers, sizePage, currentPage, onSetPages}) => {
    let countPages = Math.ceil(totalCountUsers / sizePage);
    let pages = [];
    for (let i = 1; i <= countPages; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(p => {
                return <span className={currentPage === p && styles.usersPage} onClick={() => {
                    onSetPages(p)
                }}>{p}</span>
            })}
        </div>
    )
};

export default Paginator;