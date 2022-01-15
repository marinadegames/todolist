// imports
import React from "react";

// types
type propsType = {
    name: string
    callback: () => void
}

// components

export const Button = (props: propsType) => {

    const onClickHandler = () => {
        props.callback()
    }

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}