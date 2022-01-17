import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {CustomButton} from "./Components/CustomButton";
import {EditableSpan} from "./Components/EditableSpan";
import {CustomInput} from "./Components/CustomInput";
import {Button, Checkbox} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateToDoList: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

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
                          callback={(title) => callBackHandlerForEditableSpanForHeader(title)}/>
            <CustomButton name={''} callback={removeTodolist}/>
        </h3>
        <CustomInput callback={callbackHandlerForInput} label={'add task'}/>
        <ul>
            {
                props.tasks.map(t => {


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            onChange={(e) => onChangeHandlerFromCheckBox(e, t.id)}
                            checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title}
                                      callback={(title) => callBackHandlerForEditableSpan(t.id, title)}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <CustomButton name={''}

                                      callback={() => onClickHandler(t.id)}/>

                    </div>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'}
                    variant={props.filter === 'active' ? "contained" : "text"}
                    className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'}
                    variant={props.filter === 'completed' ? "contained" : "text"}
                    className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


