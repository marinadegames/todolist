// imports
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasksReducer";
import {v1} from "uuid";

// start state
let todolistId1: string = v1();
let todolistId2: string = v1();

let startState: TasksStateType

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        [todolistId2]: [
            {id: '1', title: 'bread', isDone: true},
            {id: '2', title: 'milk', isDone: false},
            {id: '3', title: 'water', isDone: false},
        ],
    }
})


// tests
test('task REMOVE', () => {
    const action = removeTaskAC('2', todolistId1)
    const endState = tasksReducer(startState, action)
    expect(startState[todolistId1].length).toBe(3)
    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId1].every(t => t.id !== '2')).toBeTruthy()
});
test('task ADD', () => {
    const newTitleTask = 'React'
    const action = addTaskAC(newTitleTask, todolistId1)
    const endState = tasksReducer(startState, action)
    expect(startState[todolistId1].length).toBe(3)
    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId1][3].title).toBe(newTitleTask)
});
test('CHANGE STATUS TASK', () => {
    const newTitle = 'React'
    const action = changeTaskTitleAC('1', newTitle, todolistId1, false)
    const endState = tasksReducer(startState, action);
    expect(endState[todolistId1][0].title).toBe('React');
    // expect().toBe();
})
test('CHANGE TASK', () => {
    const action = changeTaskStatusAC("2", false, todolistId2);
    const endState = tasksReducer(startState, action)
    expect(endState[todolistId2][1].isDone).toBe(false);
});

