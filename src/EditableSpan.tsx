import React, {useState} from "react";

type propsType = {
    value: string
}

export const EditableSpan = (props: propsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(!editMode)
        setValue(props.value)

    }
    const changeInput = (e: string) => {
      setValue(e)
    }
    
    return(
        editMode
        ? <input onBlur={activateEditMode}
                 autoFocus
                 onChange={(e) => changeInput(e.currentTarget.value)}
                 value={value}/>
        : <span onDoubleClick={activateEditMode} >{props.value}</span>
    )
}