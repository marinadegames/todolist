// imports
import {v1} from "uuid";
import {AddTaskActionType} from "./tasksReducer";
import {todolistsAPI, TodolistType} from "../API/todolists-API";
import {Dispatch} from "redux";

// types
type RemoveToDoListActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddToDoListActionType = {
    type: 'ADD_TODOLIST'
    todolist: TodolistType
}
type ChangeToDoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}
type ChangeToDoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET_TODOLISTS'
    todolists: Array<TodolistType>
}
type ActionType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType
    | AddTaskActionType
    | SetTodolistsActionType

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

// initial state
export type FilterValuesType = "all" | "active" | "completed";
let initialState: Array<TodolistDomainType> = []


// reducer
export const toDoListsReducer = (toDoLists = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return toDoLists.filter(tl => tl.id !== action.id)
        case 'ADD_TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...toDoLists]
        case 'CHANGE_TODOLIST_TITLE':
            return toDoLists.map(td => action.id === td.id ? {...td, title: action.title} : td)
        case 'CHANGE_TODOLIST_FILTER':
            const toDoList = toDoLists.find(tl => tl.id === action.id)
            if (toDoList) {
                toDoList.filter = action.filter
            }
            return [...toDoLists]
        case "SET_TODOLISTS":
            return action.todolists.map(td => ({...td, filter: 'all'}))
        default:
            return toDoLists
    }
}


// action creators
export const removeToDoListAC = (id: string): RemoveToDoListActionType => {
    return {type: "REMOVE_TODOLIST", id}
}
export const addToDoListAC = (todolist: TodolistType): AddToDoListActionType => {
    return {type: "ADD_TODOLIST", todolist}
}
export const changeToDoListTitleAC = (id: string, title: string): ChangeToDoListTitleActionType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        id,
        title
    }
}
export const ChangeToDoListFilterAC = (id: string, filter: FilterValuesType): ChangeToDoListFilterActionType => {
    return {type: "CHANGE_TODOLIST_FILTER", id, filter}
}
export const SetTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: "SET_TODOLISTS", todolists}
}

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(resp => {
                dispatch(SetTodolistsAC(resp.data))
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(resp => {
                dispatch(removeToDoListAC(todolistId))
            })
    }
}
export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(resp => {
                dispatch(addToDoListAC(resp.data.data.item))
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(resp => {
                dispatch(changeToDoListTitleAC(todolistId, title))
            })
    }
}

