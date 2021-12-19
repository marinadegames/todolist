// imports
import React, {useState} from 'react';
import {FilterType} from "./App";
import s from './Todolist.module.css'
import {v1} from "uuid";


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
}

// components
export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onChangeHandler = (event: any) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const addTaskFunction = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onKeyPressTask = (event: any) => {
        if (event.charCode === 13) {
            addTaskFunction();
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div className={s.addTaskForm}>
            <input value={newTaskTitle}
                   onKeyPress={onKeyPressTask}
                   onChange={onChangeHandler}/>

            <button onClick={addTaskFunction} className={s.btnAddTask}>
                +
            </button>
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
                        <input type="checkbox" checked={t.isDone}/>
                        <span> {t.title} </span>
                    </li>
                )
            })}
        </ul>

        <div>
            <button className={s.btnAll} onClick={() => props.filteredTasks('ALL')}>All</button>
            <button className={s.btnActive} onClick={() => props.filteredTasks('ACTIVE')}>Active</button>
            <button className={s.btnCompleted} onClick={() => props.filteredTasks('COMPLETED')}>Completed</button>
        </div>

    </div>
}
