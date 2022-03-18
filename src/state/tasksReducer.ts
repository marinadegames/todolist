// imports
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../API/todolists-API";
import {addToDoListAC, setTodolistsAC} from "./toDoListsReducer";
import {AppThunk, rootReducerType} from "./state";
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from "./appReducer";


// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// initial state
let initialState: TasksStateType = {}

// types
export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addToDoListAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

// reducer
export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case 'ADD_TASK':
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTaskADD = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: action.todolistId,
                order: 0,
                addedDate: 'string',
            }
            const newTasksADD = [...tasks, newTaskADD]
            stateCopy[action.todolistId] = newTasksADD
            return stateCopy
        case 'ADD_TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'CHANGE_TASK_TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
                    ...m,
                    title: action.title
                } : m)
            }
        case 'CHANGE_STATUS_TITLE':
            let todolistTasks = state[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.id);
            if (task) {
                task.status = action.status;
            }
            state[action.todolistId] = [...todolistTasks]
            return {...state}
        case "SET_TODOLISTS":
            const copyState = {...state}
            action.todolists.forEach(td => copyState[td.id] = [])
            return copyState
        case "SET_TASKS":
            const copyState2 = {...state}
            copyState2[action.todolistId] = action.tasks
            return copyState2
        default:
            return state
    }
}


// action creators
export const removeTaskAC = (id: string, todolistId: string) => (
    {type: "REMOVE_TASK", id, todolistId} as const)
export const addTaskAC = (title: string, todolistId: string) => (
    {type: "ADD_TASK", title, todolistId} as const)
export const changeTaskTitleAC = (id: string, title: string, todolistId: string, status: number) => (
    {type: "CHANGE_TASK_TITLE", id, title, todolistId, status} as const)
export const changeTaskStatusAC = (id: string, status: number, todolistId: string) => (
    {type: "CHANGE_STATUS_TITLE", id, status, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => (
    {type: "SET_TASKS", tasks, todolistId} as const)


// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => async (dispatch: any | SetStatusAT) => {

    try {
        dispatch(setStatusAC('loading'))
        const resp = await todolistsAPI.getTasks(todolistId)
        if (resp.data.items.length !== 0) {
            const tasks = resp.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
        }
    } catch (e) {
        console.warn(e)
    }
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch: any | SetErrorAT) => {
    try {
        dispatch(setStatusAC('loading'))
        const resp = await todolistsAPI.createTask(todolistId, title)
        if (resp.data.resultCode === 0) {
            dispatch(addTaskAC(title, todolistId))
            dispatch(setStatusAC('succeeded'))
        } else {
            if (resp.data.messages.length) {
                dispatch(setErrorAC(resp.data.messages[0]))
            } else {
                dispatch(setErrorAC('some error'))
            }
        }

    } catch (e) {
        console.warn(e)
    }
}
export const deleteTasksTC = (todolistId: string, taskId: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAC('loading'))
        const resp = await todolistsAPI.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(taskId, todolistId))
        console.log(resp)
        dispatch(setStatusAC('succeeded'))
    } catch (e) {
        console.warn(e)
    }
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunk => async (dispatch: any, getState: () => rootReducerType) => {
    try {
        dispatch(setStatusAC('loading'))
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
            const action = changeTaskStatusAC(taskId, status, todolistId)
            dispatch(action)
            dispatch(setStatusAC('succeeded'))
            console.log(resp)
        }
    } catch (e) {
        console.warn(e)
    }
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => async (
    dispatch: any,
    getState: () => rootReducerType) => {
    try {
        dispatch(setStatusAC('loading'))
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
            dispatch(changeTaskTitleAC(taskId, title, todolistId, task.status))
            dispatch(setStatusAC('succeeded'))
            console.log(resp)
        }
    } catch (e) {
        console.warn(e)
    }

}
