// imports
import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../src/state/tasksReducer";
import {toDoListsReducer} from "../src/state/toDoListsReducer";
import {rootReducerType} from "../src/state/state";
import {TaskPriorities, TaskStatuses} from "../src/API/todolists-API";

// combine reducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer
})

// initial state
const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: '1',
                title: 'HTML',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: 'string',
            },
            {id: v1(), title: "JS", isDone: false}
        ],
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as rootReducerType);
export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
