import {combineReducers, createStore, applyMiddleware} from "redux";
import {tasksReducer} from "./tasksReducer";
import {toDoListsReducer} from "./toDoListsReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer,
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store