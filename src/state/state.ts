import {combineReducers} from "redux";
import {tasksReducer} from "./tasksReducer";
import {toDoListsReducer} from "./toDoListsReducer";
import thunk from "redux-thunk";
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

// @ts-ignore
window.store = store