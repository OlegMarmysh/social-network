import React, { useState } from 'react'
import styles from './Paginator.module.css'

const Paginator = ({ totalCountItems, sizePage, currentPage, onSetPages, portionSize }) => {
  const countPages = Math.ceil(totalCountItems / sizePage)
  const pages = []
  for (let i = 1; i <= countPages; i++) {
    pages.push(i)
  }
  const portionCount = Math.ceil(countPages / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftBorderPortion = (portionNumber - 1) * portionSize + 1
  const rightBorderPortion = portionNumber * portionSize
  return (
    <div className={styles.wrapper}>
      {portionNumber > 1 &&
            <button className={styles.prevBtn} onClick={() => {
              setPortionNumber(portionNumber - 1)
            }}>{'<'}</button>
      }
      {pages.filter(p => p >= leftBorderPortion && p <= rightBorderPortion).map(p => {
        return <div key={p} className={styles.usersPage}><button className={currentPage === p && styles.activePage} onClick={() => {
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
}

export default Paginator
