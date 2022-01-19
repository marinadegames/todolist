// imports
import React from "react";
import {Button, IconButton} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
            <IconButton color={'primary'}
                        onClick={onClickHandler}
                        size={'small'}>
                <DeleteOutlineIcon/>
            </IconButton>
    )
}