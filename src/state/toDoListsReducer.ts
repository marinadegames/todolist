// imports
import {todolistsAPI, TodolistType} from "../API/todolists-API";
import {setStatusAC} from "./appReducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

//types
export type AddToDoListActionType = ReturnType<typeof addToDoListAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type FilterValuesType = "all" | "active" | "completed";

// initial state
let initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) state.splice(index, 1)
        },
        addToDoListAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({...action.payload.todolist, filter: 'all'})
        },
        changeToDoListTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeToDoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(td => ({...td, filter: 'all'}))
        },
    }
})

// reducer
export const toDoListsReducer = slice.reducer;
export const {
    removeTodolistAC,
    addToDoListAC,
    changeToDoListTitleAC,
    changeToDoListFilterAC,
    setTodolistsAC
} = slice.actions

// thunks
export const fetchTodolistsTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const resp = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC({todolists: resp.data}))
        dispatch(setStatusAC({status: 'succeeded'}))
    } catch (e) {
        console.warn(e)
    }
}
export const removeTodolistsTC = (todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        await todolistsAPI.deleteTodolist(todolistId)
        dispatch(removeTodolistAC({id: todolistId}))
        dispatch(setStatusAC({status: 'succeeded'}))
    } catch (e) {
        console.warn(e)
    }
}
export const createTodolistTC = (title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const resp = await todolistsAPI.createTodolist(title)
        dispatch(setStatusAC({status: 'succeeded'}))
        dispatch(addToDoListAC({todolist: resp.data.data.item}))
    } catch (e) {
        console.warn(e)
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const resp = todolistsAPI.updateTodolist(todolistId, title)
        console.log(resp)
        dispatch(changeToDoListTitleAC({id: todolistId, title: title}))
        dispatch(setStatusAC({status: 'succeeded'}))
    } catch (e) {
        console.warn(e)
    }


}

