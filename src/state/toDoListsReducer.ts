// imports
import {todolistsAPI, TodolistType} from "../API/todolists-API";
import {AppThunk} from "./state";
import {setStatusAC} from "./appReducer";

// types
export type AddToDoListActionType = ReturnType<typeof addToDoListAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type TodolistsActionType =
    | AddToDoListActionType
    | SetTodolistsActionType
    | ReturnType<typeof removeToDoListAC>
    | ReturnType<typeof changeToDoListTitleAC>
    | ReturnType<typeof changeToDoListFilterAC>
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
            return [{...action.todolist, filter: 'all'}, ...toDoLists]
        case 'CHANGE_TODOLIST_TITLE':
            return toDoLists.map(td => action.id === td.id ? {...td, title: action.title} : td)
        case 'CHANGE_TODOLIST_FILTER':
            return toDoLists.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        case "SET_TODOLISTS":
            return action.todolists.map(td => ({...td, filter: 'all'}))
        default:
            return toDoLists
    }
}


// action creators
export const removeToDoListAC = (id: string) => ({type: "REMOVE_TODOLIST", id} as const)
export const addToDoListAC = (todolist: TodolistType) => ({type: "ADD_TODOLIST", todolist} as const)
export const changeToDoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    id,
    title
} as const)
export const changeToDoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE_TODOLIST_FILTER",
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET_TODOLISTS", todolists} as const)


// thunks
export const fetchTodolistsTC = (): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAC('loading'))
        const resp = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(resp.data))
        console.log(resp)
        dispatch(setStatusAC('succeeded'))
    } catch (e) {
        console.warn(e)
    }
}
export const removeTodolistsTC = (todolistId: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAC('loading'))
        const resp = await todolistsAPI.deleteTodolist(todolistId)
        dispatch(removeToDoListAC(todolistId))
        console.log(resp)
        dispatch(setStatusAC('succeeded'))
    } catch (e) {
        console.warn(e)
    }
}
export const createTodolistTC = (title: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAC('loading'))
        const resp = await todolistsAPI.createTodolist(title)
        dispatch(addToDoListAC(resp.data.data.item))
        console.log(resp)
        dispatch(setStatusAC('succeeded'))
    } catch (e) {
        console.warn(e)
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => async (dispatch: any) => {
    try {
        dispatch(setStatusAC('loading'))
        const resp = todolistsAPI.updateTodolist(todolistId, title)
        dispatch(changeToDoListTitleAC(todolistId, title))
        console.log(resp)
        dispatch(setStatusAC('succeeded'))
    } catch (e) {
        console.warn(e)
    }


}

