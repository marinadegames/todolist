// imports
import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../src/state/tasksReducer";
import {toDoListsReducer} from "../src/state/toDoListsReducer";
import {rootReducerType} from "../src/state/state";

// combine reducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer
})

// initial state
const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as rootReducerType);
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
