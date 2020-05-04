import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserStatus } from '../../../redux/profilePageReducer'

const ProfileStatusWithHooks = (props) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)
  useEffect(() => { setStatus(props.status) }, [props.status])
  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    dispatch(updateUserStatus(status))
  }
  const onChangeInput = (e) => {
    setStatus(e.currentTarget.value)
  }
  return (
    <div >
      {!editMode &&
                <div>
                  <span onClick={activateEditMode}>{props.status || 'No status'}</span>
                </div>
      }
      {editMode &&
                <input onChange={onChangeInput} value={status} onBlur={deactivateEditMode} autoFocus={true}/>
      }
    </div>
  )
}

export default ProfileStatusWithHooks
