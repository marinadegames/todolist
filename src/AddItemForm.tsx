import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    //data
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    //functions
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addItem()
        }
    }


    const errorMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : <div>Enter task title</div>


    // return
    return (
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddItem}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}