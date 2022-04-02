// imports
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../API/todolists-API";
import {rootReducerType} from "./state";
import {setErrorAC, setStatusAC} from "./appReducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {addToDoListAC, removeTodolistAC, setTodolistsAC} from "./toDoListsReducer";

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// initial state
let initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            state[action.payload.todolistId].unshift({
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: 'string',
            })
        },
        changeTaskTitleAC(state, action: PayloadAction<{ id: string, title: string, todolistId: string, status: number }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            const task = {
                id: action.payload.id,
                title: action.payload.title,
                todoListId: action.payload.todolistId,
                status: action.payload.status
            }
            if (index > -1) {
                tasks[index] = {...tasks[index], ...task,}
            }
        },
        changeTaskStatusAC(state, action: PayloadAction<{ id: string, status: number, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks[index] = {...tasks[index], status: action.payload.status,}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder => {
        builder.addCase(addToDoListAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            const copyState = {...state}
            action.payload.todolists.forEach(td => copyState[td.id] = [])
            return copyState
        });
    }),
})

// reducer
export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC, setTasksAC} = slice.actions

// thunks
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const resp = await todolistsAPI.getTasks(todolistId)
        if (resp.data.items.length !== 0) {

            const tasks = resp.data.items
            const action = setTasksAC({tasks, todolistId})
            dispatch(action)

        }
    } catch (e) {
        console.warn(e)
    } finally {
        dispatch(setStatusAC({status: 'succeeded'}))
    }
}
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const resp = await todolistsAPI.createTask(todolistId, title)
        if (resp.data.resultCode === 0) {
            dispatch(addTaskAC({title, todolistId}))
            dispatch(setStatusAC({status: 'succeeded'}))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAC({error: resp.data.messages[0]}))
            } else {
                dispatch(setErrorAC({error: 'some error'}))
            }
        }

    } catch (e) {
        console.warn(e)
    }
}
export const deleteTasksTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const resp = await todolistsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC({id: taskId, todolistId}))
        console.log(resp)
        dispatch(setStatusAC({status: 'succeeded'}))
    } catch (e) {
        console.warn(e)
    }
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => async (dispatch: Dispatch, getState: () => rootReducerType) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            const resp = await todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
            const action = changeTaskStatusAC({id: taskId, status, todolistId})
            dispatch(action)
            dispatch(setStatusAC({status: 'succeeded'}))
            console.log(resp)
        }
    } catch (e) {
        console.warn(e)
    }
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => async (dispatch: Dispatch, getState: () => rootReducerType) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            const resp = todolistsAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
            dispatch(changeTaskTitleAC({id: taskId, title, todolistId, status: task.status}))
            dispatch(setStatusAC({status: 'succeeded'}))
            console.log(resp)
        }
    } catch (e) {
        console.warn(e)
    }
}


