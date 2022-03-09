// imports
import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../API/todolists-API";
import s from './todilistsStoriesStles.module.css'

// default stories
export default {
    title: 'API'
}


// requests:

// todolists
export const GetTodolists = () => {

    const [state, setState] = useState<Array<any>>([])

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(resp => {
                setState(resp.data)
            })
    }, [])

    return (
        <table id={s.customers}>
            <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>Added date</th>
                <th>Order</th>
            </tr>
            {state.map(el => {
                return (
                    <tr>
                        <td>{el.id}</td>
                        <td>{el.title}</td>
                        <td>{el.addedDate}</td>
                        <td>{el.order}</td>
                    </tr>
                )
            })}
        </table>

    )
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

    const [stateId, setStateId] = useState<string>('')
    const [message, setMessage] = useState<any | null>(null)

    const onChangeValueStateId = (e: string) => {
        setStateId(e)
        console.log(e)
    }

    const deleteTodolistHandler = () => {
        todolistsAPI.deleteTodolist(stateId)
            .then(resp => {
                setMessage(resp.data)
            })
            .catch(error => {
                setMessage(error)
            })
    }


    return <div>
        <input placeholder={'todolist id'}
               value={stateId}
               onChange={(e) => onChangeValueStateId(e.currentTarget.value)}
        />
        <button onClick={deleteTodolistHandler}>delete</button>
        {/*<div>{message}</div>*/}
    </div>
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
        const todolistId = 'a34eafbb-ef85-4667-845b-ed75d92715c6'
        todolistsAPI.getTasks(todolistId)
            .then(resp => {
                setState(resp.data)
            })
    }, [])
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'bcde547c-338b-401c-bb89-8ef6b4900695'
        const taskId = ''
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(resp => {
                setState(resp.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {

    // local state
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('title 1')
    const [taskDescription, setTaskDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    // request
    const createTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: '',
            description: ',',
            priority: priority,
            startDate: '',
            status: status,
            title: taskTitle
        })
            .then(resp => {
                setState(resp.data)
            })
    }

    // return
    return (
        <div> {JSON.stringify(state)}
            <div>
                <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
                <input placeholder={'Task title'} value={taskTitle} onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>
                <input placeholder={'Task description'} value={taskDescription} onChange={(e) => {
                    setTaskDescription(e.currentTarget.value)
                }}/>
                <input placeholder={'Task status'} value={status} type='number' onChange={(e) => {
                    setStatus(+e.currentTarget.value)
                }}/>
                <button onClick={createTask}>create task</button>
            </div>
        </div>
    )
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'a34eafbb-ef85-4667-845b-ed75d92715c6'
        const newTaskTitle = 'SEcond title'
        todolistsAPI.createTask(todolistId, newTaskTitle)
            .then(resp => {
                setState(resp.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}