// imports
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";
import s from './Todolist.module.css'


// types
type TaskType = {
    id: string
    title: string
    isDone: boolean

}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filteredTasks: (value: FilterType) => void
    addTask: (title: string) => void
    changeCheckBoxValue: (id: string, value: boolean) => void
    filterValue: any
}

// components
export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(event.currentTarget.value)
    }
    const addTaskFunction = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }else {
            setError(true)
        }

    }
    const onKeyPressTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addTaskFunction();
        }
    }

    const changeStatusCheckBox = (id: string, value:boolean) => {
        props.changeCheckBoxValue(id, value)

    }

    return <div>
        <h3>{props.title}</h3>
        <div className={s.addTaskForm}>
            <input value={newTaskTitle}
                   onKeyPress={onKeyPressTask}
                   className={error ? s.error : s.inputAddTask }
                   onChange={onChangeHandler}/>
            <button onClick={addTaskFunction}
                    className={s.btnAddTask}> +</button>
        </div>
        {error && <div className={s.errorMessage}>Input is not required!</div>}
        <div className={s.allBtn}>
            <button className={props.filterValue === 'ALL' ? s.btnAll : s.btn}
                    onClick={() => props.filteredTasks('ALL')}>All</button>
            <button className={props.filterValue === 'ACTIVE' ? s.btnActive : s.btn}
                    onClick={() => props.filteredTasks('ACTIVE')}>Active</button>
            <button className={props.filterValue === 'COMPLETED' ? s.btnCompleted : s.btn}
                    onClick={() => props.filteredTasks('COMPLETED')}>Completed</button>
        </div>
        <ul className={s.tasks}>
            {props.tasks.map((t) => {

                return (
                    <li key={t.id}>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }
                        }> X
                        </button>
                        <input type="checkbox"
                               onChange={(event) => changeStatusCheckBox(t.id, event.currentTarget.checked)}
                               checked={t.isDone}/>
                        <span> {t.title} </span>
                    </li>
                )
            })}
        </ul>


    </div>
}
