import React from 'react'
import s from './Mypost.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../../Common/FormsControl'
import { maxLengthCreator, required } from '../../utilits/validators'
import Preloader from '../../Common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../../redux/profilePageReducer'

const maxLength20 = maxLengthCreator(20)

const MyPost = React.memo(() => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.profilePage.posts)
  const profile = useSelector(state => state.profilePage.profile)
  if (!profile) {
    return <Preloader/>
  }
  const postsElements = posts.map(p => <Post key={p.id}
    postId={p.id} post={p.post} likeCounts={p.likeCounts}/>)

  const onAddPost = (values) => {
    dispatch(addPost(values.newTextPost))
  }
  return (
    <div className={s.MyPost}>
      <AddMessageForm onSubmit={onAddPost}/>
      <div className={s.Posts}>
        {postsElements}
      </div>
    </div>
  )
})

let AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.addMessageForm}>
      <div className={s.inputContent}>
        <Field name='newTextPost' component={Input} validate={[required, maxLength20]} placeholder={'Add new post'}/>
      </div>
      <div>
        <button>Add</button>
      </div>
    </form>
  )
}

AddMessageForm = reduxForm({ form: 'ProfileAddMessageForm' })(AddMessageForm)

export default MyPost
