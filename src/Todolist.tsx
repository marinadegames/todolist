// imports
import React from 'react';
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

}

// components
export function Todolist(props: PropsType) {


    return <div>
        <h3>{props.title}</h3>

        <ul className={s.tasks}>
            {props.tasks.map((t) => {
                return (
                    <li key={t.id} >
                        <button onClick={() => props.removeTask(t.id)}> X </button>
                        <input type="checkbox" checked={t.isDone}/>
                        <span> {t.title} </span>
                    </li>
                )
            })}
        </ul>
        <div className={s.addTaskForm}>
            <input/>
            <button className={s.btnAddTask}>+</button>
        </div>
        <div>
            <button className={s.btnAll} onClick={() => props.filteredTasks('ALL')}>All</button>
            <button className={s.btnActive} onClick={() => props.filteredTasks('ACTIVE')}>Active</button>
            <button className={s.btnCompleted} onClick={() => props.filteredTasks('COMPLETED')}>Completed</button>
        </div>

    </div>
}
