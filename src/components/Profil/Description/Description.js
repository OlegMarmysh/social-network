import React, { useState } from 'react'
import s from './Description.module.css'
import Preloader from '../../Common/Preloader/Preloader'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../images/users-vector-icon-png_260862.jpg'
import ProfileDataReduxForm from './ProfileDataReduxForm'
import { useDispatch, useSelector } from 'react-redux'
import { savePhoto, saveProfile } from '../../../redux/profilePageReducer'

const Description = ({ isOwner }) => {
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profilePage.profile)
  const status = useSelector(state => state.profilePage.status)
  if (!profile) {
    return <Preloader/>
  }
  const onChooseAvatar = (e) => {
    if (e.target.files.length) {
      dispatch(savePhoto(e.target.files[0]))
    }
  }
  const handleSubmit = (formData) => {
    dispatch(saveProfile(formData)).then(
      () => {
        setEditMode(false)
      }
    )
  }
  return (
    <div className={s.description}>
      <div className={s.avatarContent}>
        <img className={s.avatar} src={profile.photos.large || userPhoto}/>
        {
          isOwner && <div className={s.chooseAvatar}>
            <label className={s.label}><input type={'file'} onChange={onChooseAvatar}/>Update photo</label>
          </div>
        }
        <div className={s.editMode}>
          {isOwner && <div>
            <button onClick={() => {
              setEditMode(true)
            }}>edit
            </button>
          </div>}
        </div>
      </div>
      <div className={s.profileData}>
        {editMode
          ? <ProfileDataReduxForm onSubmit={handleSubmit} profile={profile} initialValues={profile}/>
          : <ProfileData profile={profile} status={status} />
        }
      </div>
    </div>
  )
}

const ProfileData = ({ profile, status }) => {
  return <div>
    <div className={s.fullName}>
      {profile.fullName}
    </div>
    <div className={s.status}>
      <ProfileStatusWithHooks status={status}/>
    </div>
    <div className={s.aboutProfile}>
      <div>
        <b>About me: </b><span>{profile.aboutMe}</span>
      </div>
      <div>
        <b>Looking for a job: </b><span>{profile.lookingForAJob ? 'yes' : 'no'}</span>
      </div>
      {profile.lookingForAJob && <div>
        <b>Job description: </b><span>{profile.lookingForAJobDescription}</span>
      </div>}
    </div>
  </div>
}

const Contact = ({ contactKey, contactValue }) => {
  return (
    <div>
      {contactValue &&
            <div className={s.contact}>
              <b>{contactKey}: </b> <span>{contactValue}</span>
            </div>
      }
    </div>
  )
}

export default Description
