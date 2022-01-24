// imports
import {v1} from "uuid";
import {TodolistType} from "../App";
import {toDoListsReducer} from "./toDoListsReducer";


// const
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const REMOVE_TASK = 'REMOVE_TASK'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

// tests userReducer
test ('REMOVE TODO LIST', () => {

    let toDoListId1 = v1()
    let toDoListId2 = v1()

    const startState: Array<TodolistType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = toDoListsReducer(startState, {type: REMOVE_TODOLIST, id: toDoListId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(toDoListId2)

})
test ('ADD TODO LIST', () => {

    let toDoListId1 = v1()
    let toDoListId2 = v1()

    const startState: Array<TodolistType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'},
    ]

    const newToDoListTitle = 'What to learn'

    const endState = toDoListsReducer(startState, {type: ADD_TODOLIST, title: newToDoListTitle})

    expect(endState[2].title).toBe(newToDoListTitle)
    expect(endState[2].filter).toBe('all')

})
test ('CHANGE TODOLIST TITLE', () => {

    let toDoListId1 = v1()
    let toDoListId2 = v1()
    let newToDoListTitle = "New ToDoList"
    const startState: Array<TodolistType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'all'},
        {id: toDoListId2, title: 'What to buy', filter: 'all'},
    ]

    const action = {
        type: 'CHANGE_TODOLIST_TITLE',
        id: toDoListId2,
        title: newToDoListTitle
    }

    const endState = toDoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newToDoListTitle)

})
