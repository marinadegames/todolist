import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, ButtonGroup, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type propsType = {
    callback: (newTitle: string) => void
    label: string
}

export const CustomInput = React.memo( (props: propsType) => {

    console.log('CUSTOM INPUT')

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
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
        <ButtonGroup>
            <TextField value={title}
                       variant={'outlined'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label={error ? "Error" : props.label}
                       helperText={error}
            />
            <Button onClick={addTask}
                    variant="outlined"
                    style={{margin: '0 0 0 10px'}}
                    color='primary'>
                <AddIcon/>
            </Button>
        </ButtonGroup>
    )
})