// imports
import {v1} from "uuid";
import {AddTaskActionType} from "./tasksReducer";
import {TodolistType} from "../API/todolists-API";

// types
type RemoveToDoListActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddToDoListActionType = {
    type: 'ADD_TODOLIST'
    title: string
    newId: string
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
type ActionType =
    RemoveToDoListActionType
    | AddToDoListActionType
    | ChangeToDoListTitleActionType
    | ChangeToDoListFilterActionType
    | AddTaskActionType

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
            return [...toDoLists, {id: action.newId, title: action.title, filter: 'all', addedDate: '', order: 0}]
        case 'CHANGE_TODOLIST_TITLE':
            return toDoLists.map(td => action.id === td.id ? {...td, title: action.title} : td)
        case 'CHANGE_TODOLIST_FILTER':
            const toDoList = toDoLists.find(tl => tl.id === action.id)
            if (toDoList) {
                toDoList.filter = action.filter
            }
            return [...toDoLists]
        default:
            return toDoLists
    }
}


// action creators
export const removeToDoListAC = (id: string): RemoveToDoListActionType => {
    return {type: "REMOVE_TODOLIST", id}
}
export const addToDoListAC = (title: string): AddToDoListActionType => {
    let newId = v1()
    return {type: "ADD_TODOLIST", title, newId}
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