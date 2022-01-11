import React, {useState, KeyboardEvent, ChangeEvent,  MouseEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    title: string
    todoListID: string
    addTask: (title: string, todoListID: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask:(id: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (tasksID: string, title: string, todoListID: string) => void
    changeToDoListTitle: (title: string, todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement> )=>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <button onClick={removeTask}>x</button>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle} />

            </li>
        )
    })

    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.todoListID)
    }
    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)


    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
    }
    const changeToDoTitle = (newTitle: string) => {
        props.changeToDoListTitle(newTitle, props.todoListID)
    }

    return(
        <div>
            <h3>
                <EditableSpan title={props.title}
                              changeTitle={changeToDoTitle}/>
                {/*{props.title}*/}
                <button onClick={removeTodoList}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                { tasksList }
            </ul>
            <div>
                <button
                    className={getBtnClass("all")}
                    onClick={onClickSetAllFilter}
                >All</button>
                <button
                    className={getBtnClass("active")}
                    onClick={onClickSetActiveFilter}
                >Active</button>
                <button
                    className={getBtnClass("completed")}
                    onClick={onClickSetCompletedFilter}
                >Completed</button>
            </div>
        </div>
    )
}

export default TodoList;