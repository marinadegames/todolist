// imports
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../API/todolists-API";

// default stories
export default {
    title: 'API'
}


// requests:

// todolists
export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const newTitle = 'NEW TITLE!!!!'
    useEffect(() => {
        todolistsAPI.createTodolist(newTitle).then(resp => {
            setState(resp.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = '8d5a4a45-1b69-4ff1-8080-eef9e53a40c4'
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId).then(resp => {
            setState(resp.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '8d5a4a45-1b69-4ff1-8080-eef9e53a40c4'
    const newTitle = 'YO-YO-YO!!!!'
    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, newTitle).then(resp => {
            setState(resp.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

// tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '590e8858-2029-4fb0-97ac-bee478e2bf91'
        todolistsAPI.getTasks(todolistId)
            .then(resp => {
                setState(resp.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '590e8858-2029-4fb0-97ac-bee478e2bf91'
        const taskId = ''
        const newTitleTask = 'DRINK WATER'
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(resp => {
                setState(resp.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '590e8858-2029-4fb0-97ac-bee478e2bf91'
        const newTaskTitle = 'NEW TASK TITLE'
        const taskId = ''
        todolistsAPI.updateTask(todolistId, taskId, newTaskTitle)
            .then(resp => {
                setState(resp.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '590e8858-2029-4fb0-97ac-bee478e2bf91'
        const newTaskTitle = 'NEW TASK TITLE'
        todolistsAPI.createTask(todolistId, newTaskTitle)
            .then(resp => {
                setState(resp.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}