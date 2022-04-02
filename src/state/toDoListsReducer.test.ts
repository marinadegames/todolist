// imports
import {v1} from "uuid";
import {addToDoListAC, changeToDoListFilterAC, changeToDoListTitleAC, FilterValuesType, removeTodolistAC, setTodolistsAC, TodolistDomainType, toDoListsReducer} from "./toDoListsReducer";
import {TodolistType} from "../API/todolists-API";


// start State
let todolistId1: string = v1();
let todolistId2: string = v1();
let startState: Array<TodolistDomainType>

beforeEach(() => {
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})

// tests
test('correct todolist should be removed', () => {
    const endState = toDoListsReducer(startState, removeTodolistAC({id: todolistId1}))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('add todolist should be added', () => {
    let newTodolistTitle = "New Todolist";
    let newTodolist: TodolistType = {
        id: v1(),
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }
    const endState = toDoListsReducer(startState, addToDoListAC({todolist: newTodolist}))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('change todolist title should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const endState = toDoListsReducer(startState, changeToDoListTitleAC({id: todolistId2, title: newTodolistTitle}));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";
    const endState = toDoListsReducer(startState, changeToDoListFilterAC({id: todolistId2, filter: newFilter}));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolist should be set to the state', () => {
    const action = setTodolistsAC({todolists: startState})
    const endState = toDoListsReducer([], action)
    expect(endState.length).toBe(2)

})
