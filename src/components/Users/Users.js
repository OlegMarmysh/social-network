import React, { useEffect } from 'react'
import styles from './Users.module.css'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import { useDispatch, useSelector } from 'react-redux'
import Preloader from '../Common/Preloader/Preloader'
import { requestUsers } from '../../redux/usersPageReducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'

const Users = () => {
  const {
    users, totalCountItems, sizePage, currentPage,
    isFetching, followingInProgress, portionSize
  } = useSelector(state => ({
    users: state.users.users,
    totalCountItems: state.users.totalCountItems,
    sizePage: state.users.sizePage,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
    followingInProgress: state.users.followingInProgress,
    portionSize: state.users.portionSize
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestUsers(currentPage, sizePage))
  }, [])
  const onSetPages = (pageNumber) => {
    dispatch(requestUsers(pageNumber, sizePage))
  }
  return (
    <>
      <div>{isFetching ? <Preloader/> : null} </div>
      <div className={styles.wrapper}>
        <div className={styles.paginator}>
          <Paginator totalCountItems={totalCountItems} sizePage={sizePage}
            currentPage={currentPage} onSetPages={onSetPages}
            portionSize={portionSize}
          />
        </div>
        <div className={styles.users}>
          {
            users.map(u => <User key={u.id} userId={u.id} status={u.status} name={u.name} followed={u.followed}
              photos={u.photos}
              followingInProgress={followingInProgress}
              className={styles.users}/>)
          }
        </div>
      </div>
    </>
  )
}

export default withAuthRedirect(Users)
