import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";
import {EditableSpan} from "./Components/EditableSpan";
import {Input} from "./Components/Input";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string ,title: string) => void
    updateToDoList: (todolistId: string ,title: string) => void
}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     let newTitle = title.trim();
    //     if (newTitle !== "") {
    //         props.addTask(newTitle, props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onClickHandler = (tId: string) => {
        props.removeTask(tId, props.id)
    }
    const onChangeHandlerFromCheckBox = (e: ChangeEvent<HTMLInputElement>, tId: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(tId, newIsDoneValue, props.id);
    }

    const callBackHandlerForEditableSpan = (tId: string, title: string) => {
        props.updateTask(props.id, tId, title)
    }

    const callBackHandlerForEditableSpanForHeader = (title: string) => {
        props.updateToDoList(props.id, title)
    }

    const callbackHandlerForInput = (newTitle: string,) => {
        props.addTask(newTitle, props.id)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title}
                          callback={ (title) => callBackHandlerForEditableSpanForHeader(title)}/>
            {/*{props.title}*/}
            {/*<button onClick={removeTodolist}>x</button>*/}
            <Button name={'x'} callback={removeTodolist}/>
        </h3>
        {/*<div>*/}
        {/*    <Input />*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <Input callback={callbackHandlerForInput}/>
        <ul>
            {
                props.tasks.map(t => {

                    // const onClickHandler = (tId: string) => {
                    //     props.removeTask(tId, props.id)
                    // }
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={ (e) => onChangeHandlerFromCheckBox(e, t.id) }
                               checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title}
                                      callback={ (title) => callBackHandlerForEditableSpan(t.id, title)}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <Button name={'x'} callback={ () => onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


