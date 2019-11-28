import React, {useState, useEffect}from 'react';

const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    useEffect(()=>{setStatus(props.status)}, [props.status])
    const activateEditMode = () => {
        setEditMode(true)
    };
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    };
    const onChangeInput= (e) => {
        setStatus(e.currentTarget.value)
    };
        return (
            <div>
                {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
                </div>
                }
                {editMode &&
                <input onChange={onChangeInput} value={status} onBlur={deactivateEditMode} autoFocus={true}/>
                }
            </div>
        )
    }

export default ProfileStatusWithHooks;