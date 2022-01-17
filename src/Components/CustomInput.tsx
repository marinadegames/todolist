import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Input, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type propsType = {
    callback: (newTitle: string) => void
    label: string
}

export const CustomInput = (props: propsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callback(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <TextField value={title}
                       variant={'outlined'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label={error ? "Error" : props.label}
                       helperText={error}
            />
            <Button onClick={addTask} variant="outlined" color='primary'>
                <AddIcon/>
            </Button>
        </div>
    )
}