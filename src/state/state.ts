import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {toDoListsReducer} from "./toDoListsReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer,
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store