// imports
import React from "react";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

// types
type propsType = {
    name: string
    callback: () => void
}

// components

export const CustomButton = (props: propsType) => {

    const onClickHandler = () => {
        props.callback()
    }

    return (
        // <Button onClick={onClickHandler}>{props.name}</Button>
        <IconButton size="small" onClick={onClickHandler}>
            <Delete fontSize="inherit" />
            {/*<AddIcon/>*/}
        </IconButton>
    )
}