import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
// import * as stream from "stream";
// import {Simulate} from "react-dom/test-utils";
// import copy = Simulate.copy;

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

// C-R-U-D

// Create
// Read
// Update
// Delete

function App() {
    console.log(typeof (v1()))
    //BLL:

    const toDoList_Id1 = v1()
    const toDoList_Id2 = v1()

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoList_Id1 , title: 'What to learn', filter: 'all'},
        {id: toDoList_Id2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoList_Id1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [toDoList_Id2]: [
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "BEER", isDone: true},
            {id: v1(), title: "MILK", isDone: false},
        ],
    })

    const removeTask = (id: string, toDoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[toDoListId] = tasks[toDoListId].filter(t => t.id !== id)
        setTasks(copyTasks)
    }

    const addTask = (title: string, toDoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[toDoListId] = [{id: v1(), title: title, isDone: false}, ...tasks[toDoListId]]
        setTasks(copyTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean, toDoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[toDoListId] = tasks[toDoListId].map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }

    const changeToDoListFilter = (filter: FilterValuesType, toDoListId: string) => {
        setToDoLists(toDoLists.map(tl => tl.id === toDoListId ? {...tl, filter} : tl))
    }

    const getTasksForRender = (filter: FilterValuesType, tasks: Array<TaskType>):Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const removeToDoList = (toDoListId: string) => {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListId))
    }

    const todoListComponents = toDoLists.map(tl => {
        return (
            <TodoList
                key={tl.id}
                toDoListsId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={getTasksForRender(tl.filter, tasks[tl.id])}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeToDoListFilter={changeToDoListFilter}
                removeToDoList={removeToDoList}
            />
        )
    })


    //UI:
    return (
        <div className="App">
            {todoListComponents}
        </div>
    )
}

export default App;


