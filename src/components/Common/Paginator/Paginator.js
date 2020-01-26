import React, {useState} from 'react'
import styles from "./Paginator.module.css";

let Paginator = ({totalCountItems, sizePage, currentPage, onSetPages, portionSize}) => {
    let countPages = Math.ceil(totalCountItems / sizePage);
    let pages = [];
    for (let i = 1; i <= countPages; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(countPages / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftBorderPortion = (portionNumber - 1) * portionSize + 1;
    let rightBorderPortion = portionNumber * portionSize;
    return (
        <div className={styles.wrapper}>
            {portionNumber > 1 &&
            <button className={styles.prevBtn} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>{'<'}</button>
            }
            {pages.filter(p => p >= leftBorderPortion && p <= rightBorderPortion).map(p => {
                return <div className={styles.usersPage}><button className={currentPage===p && styles.activePage} onClick={() => {
                    onSetPages(p)
                }}>{p}</button></div>
            })}
            {portionCount > portionNumber &&
            <button className={styles.nextBtn} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>{'>'}</button>
            }
        </div>
    )
};

export default Paginator;