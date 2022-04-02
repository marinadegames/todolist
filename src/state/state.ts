import {combineReducers} from "redux";
import {TasksActionType, tasksReducer} from "./tasksReducer";
import {TodolistsActionType, toDoListsReducer} from "./toDoListsReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer,
    app: appReducer,
    auth: authReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

//all types action to all app
export type AppActionsType = TodolistsActionType | TasksActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    rootReducerType,
    unknown,
    AppActionsType>

// @ts-ignore
window.store = store