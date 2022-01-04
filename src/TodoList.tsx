import React, {useState, KeyboardEvent, ChangeEvent, MouseEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    removeToDoList: (toDoListId: string) => void
    changeToDoListFilter: (filter: FilterValuesType, toDoListId: string) => void
    toDoListsId: string
    addTask: (title: string, toDoListId: string) => void
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string, toDoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, toDoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksList = props.tasks.map((t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.toDoListsId)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.toDoListsId)
        }
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>

        )
    })
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.toDoListsId)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickSetAllFilter = () => props.changeToDoListFilter("all", props.toDoListsId)
    const onClickSetActiveFilter = () => props.changeToDoListFilter("active",props.toDoListsId)
    const onClickSetCompletedFilter = () => props.changeToDoListFilter("completed",props.toDoListsId)
    const removeToDoList = () => props.removeToDoList(props.toDoListsId)

    let allBtnClasses = ""
    if (props.filter === "all") {
        allBtnClasses = "active-filter"
    }

    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
        // return ["btn btn-hey"].concat(filter).join(" ")
    }
    const errorStyle = {
        color: "red",
    }

    const errorMessage = error
        ? <div style={errorStyle}>Title is required!</div>
        : <div>Enter task title</div>

    return (
        <div>
            <h3>{props.title} <button onClick={removeToDoList}>delete</button></h3>

            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>

            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={getBtnClass("all")} //"active btn btn-todolist"
                    onClick={onClickSetAllFilter}
                >All
                </button>
                <button
                    className={getBtnClass("active")}
                    onClick={onClickSetActiveFilter}
                >Active
                </button>
                <button
                    className={getBtnClass("completed")}
                    onClick={onClickSetCompletedFilter}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;