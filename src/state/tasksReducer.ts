// imports
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddToDOListActionType} from "./toDoListsReducer";


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
    isDone: boolean
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE_STATUS_TITLE'
    id: string
    isDone: boolean
    todolistId: string
}
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddToDOListActionType


// reducer
export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {

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
            const newTaskADD = {id: v1(), title: action.title, isDone: false}
            const newTasksADD = [...tasks, newTaskADD]
            stateCopy[action.todolistId] = newTasksADD
            return stateCopy
        case 'ADD_TODOLIST':
            const copyTasksADDTODO = {...state}
            copyTasksADDTODO[action.newId] = []
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
                task.isDone = action.isDone;
            }
            state[action.todolistId] = [...todolistTasks]
            return {...state}

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
export const changeTaskTitleAC = (id: string, title: string, todolistId: string, isDone: boolean): ChangeTaskTitleActionType => {
    return {type: "CHANGE_TASK_TITLE", id, title, todolistId, isDone}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE_STATUS_TITLE", id, isDone, todolistId}
}