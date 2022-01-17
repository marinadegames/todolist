// imports
import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

// types
type propsType = {
    title: string
    callback: (title: string) => void
}

// components

export const EditableSpan = (props: propsType) => {

    const [title, setTitle] = useState<string>(props.title)
    const [edit, setEdit] = useState<boolean>(false)

    const onClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.callback(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <TextField
                value={title}
                autoFocus
                onChange={onChangeHandler}
                onBlur={onBlurHandler}/>
            : <span onDoubleClick={onClickHandler}>{props.title}</span>
    )
}