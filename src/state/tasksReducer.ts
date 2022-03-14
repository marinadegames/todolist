// imports
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../API/todolists-API";
import {AddToDoListActionType, SetTodolistsActionType} from "./toDoListsReducer";
import {AppActionsType, AppThunk, rootReducerType} from "./state";

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// initial state
let initialState: TasksStateType = {}

// types
type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    id: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    id: string
    title: string
    todolistId: string
    status: number
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_STATUS_TITLE'
    id: string
    status: number
    todolistId: string
}
export type SetTasksActionType = {
    type: 'SET_TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export type TasksActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddToDoListActionType
    | SetTodolistsActionType
    | SetTasksActionType

// reducer
export const tasksReducer = (state = initialState, action: AppActionsType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE_TASK':
            let tasksCopy = {...state}
            const newTask = state[action.todolistId]
            const filteredTask = newTask.filter(t => t.id !== action.id)
            tasksCopy[action.todolistId] = filteredTask
            return tasksCopy
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
            const copyTasksADDTODO = {...state}
            copyTasksADDTODO[action.todolist.id] = []
            return copyTasksADDTODO
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.id ? {
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
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE_TASK", id, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD_TASK", title, todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string, status: number): ChangeTaskTitleActionType => {
    return {type: "CHANGE_TASK_TITLE", id, title, todolistId, status}
}
export const changeTaskStatusAC = (id: string, status: number, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE_STATUS_TITLE", id, status, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: "SET_TASKS", tasks, todolistId}
}

// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(resp => {
                if (resp.data.items.length !== 0) {
                    const tasks = resp.data.items
                    const action = setTasksAC(tasks, todolistId)
                    dispatch(action)
                }

            })
    }
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(resp => {
                let action = addTaskAC(title, todolistId)
                dispatch(action)
            })
    }
}
export const deleteTasksTC = (todolistId: string, taskId: string): AppThunk => {
    return (dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(resp => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses): AppThunk => {

    return (dispatch, getState: () => rootReducerType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}
export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => {
    return (dispatch, getState: () => rootReducerType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            todolistsAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then(() => {
                const action = changeTaskTitleAC(taskId, title, todolistId, task.status)
                dispatch(action)
            })
        }
    }
}
