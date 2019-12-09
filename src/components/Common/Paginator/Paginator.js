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
        <div>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>
            }
            {pages.filter(p => p >= leftBorderPortion && p <= rightBorderPortion).map(p => {
                return <span className={currentPage === p && styles.usersPage} onClick={() => {
                    onSetPages(p)
                }}>{p}</span>
            })}
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>
            }
        </div>
    )
};

export default Paginator;