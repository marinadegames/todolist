import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            offEditMode()
        }
}

    return (
        editMode
            ? <input value={title}
                     autoFocus
                     onKeyPress={(e) => onKeyPressOffEditMode(e)}
                     onChange={ (e) => onChangeSetTitle(e)}
                     onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
}