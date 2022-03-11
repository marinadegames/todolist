// imports
import {v1} from "uuid";
import {
    addToDoListAC,
    ChangeToDoListFilterAC,
    changeToDoListTitleAC, FilterValuesType,
    removeToDoListAC, SetTodolistsAC, TodolistDomainType,
    toDoListsReducer
} from "./toDoListsReducer";
import {TodolistType} from "../API/todolists-API";


// start State
let todolistId1: string = v1();
let todolistId2: string = v1();

let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

// tests
test('correct todolist should be removed', () => {
    const endState = toDoListsReducer(startState, removeToDoListAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";
    let newTodolist: TodolistType = {
        id: v1(),
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }

    const endState = toDoListsReducer(startState, addToDoListAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const endState = toDoListsReducer(startState, changeToDoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const endState = toDoListsReducer(startState, ChangeToDoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolist should be set to the state', () => {
    const action = SetTodolistsAC(startState)
    const endState = toDoListsReducer([], action)
    expect(endState.length).toBe(2)

})

