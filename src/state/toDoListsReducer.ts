import {TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: string
}


export const toDoListsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType>=> {

    switch (action.type) {

        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id != action.id)

        case 'ADD_TODOLIST':
            return [...state, { id: v1(), title: action.title, filter: 'all'}]

        case 'CHANGE_TODOLIST_TITLE': {
            const toDoList = state.find( tl => tl.id === action.id)
            if (toDoList) {
                toDoList.title = action.title
            }
            return [...state]
        }

        default:
            throw new Error("I don't understand this action type")
    }

}
