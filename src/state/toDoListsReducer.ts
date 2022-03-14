// imports
import {AddTaskActionType} from "./tasksReducer";
import {todolistsAPI, TodolistType} from "../API/todolists-API";
import {AppThunk} from "./state";

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
export type TodolistsActionType =
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
export const toDoListsReducer = (toDoLists = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
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
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const resp = await todolistsAPI.getTodolists()
        dispatch(SetTodolistsAC(resp.data))
        console.log(resp)
    }
    catch (e){
        console.warn(e)
    }
}

export const removeTodolistsTC = (todolistId: string): AppThunk => async dispatch => {
    try {
        const resp = await todolistsAPI.deleteTodolist(todolistId)
        dispatch(removeToDoListAC(todolistId))
        console.log(resp)
    } catch (e) {
        console.warn(e)
    }
}
export const createTodolistTC = (title: string): AppThunk => async dispatch => {
    try {
        const resp = await todolistsAPI.createTodolist(title)
        dispatch(addToDoListAC(resp.data.data.item))
        console.log(resp)
    } catch (e) {
        console.warn(e)
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    try {
        const resp = todolistsAPI.updateTodolist(todolistId, title)
        dispatch(changeToDoListTitleAC(todolistId, title))
        console.log(resp)
    } catch (e) {
        console.warn(e)
    }


}

