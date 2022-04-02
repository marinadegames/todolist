// imports
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType
} from "./tasksReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../API/todolists-API";
import {setTodolistsAC} from "./toDoListsReducer";

// start state
let todolistId1: string = v1();
let todolistId2: string = v1();

let startState: TasksStateType

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {
                id: '1',
                title: 'HTML',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: todolistId1,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '2',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: todolistId1,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '3',
                title: 'JS',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: todolistId1,
                order: 0,
                addedDate: 'string',
            },
        ],
        [todolistId2]: [
            {
                id: '3',
                title: 'Milk',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: todolistId2,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '5',
                title: 'Water',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: todolistId2,
                order: 0,
                addedDate: 'string',
            },
            {
                id: '6',
                title: 'Juice',
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TaskPriorities.Low,
                startDate: 'string',
                deadline: 'string',
                todoListId: todolistId2,
                order: 0,
                addedDate: 'string',
            },
        ],
    }
})

// // tests
// test('task REMOVE', () => {
//     const action = removeTaskAC('2', todolistId1)
//     const endState = tasksReducer(startState, action)
//     expect(startState[todolistId1].length).toBe(3)
//     expect(endState[todolistId1].length).toBe(2);
//     expect(endState[todolistId2].length).toBe(3);
//     expect(endState[todolistId1].every(t => t.id !== '2')).toBeTruthy()
// });
// test('task ADD', () => {
//     const newTitleTask = 'React'
//     const action = addTaskAC(newTitleTask, todolistId1)
//     const endState = tasksReducer(startState, action)
//     expect(startState[todolistId1].length).toBe(3)
//     expect(endState[todolistId1].length).toBe(4);
//     expect(endState[todolistId2].length).toBe(3);
//     expect(endState[todolistId1][3].title).toBe(newTitleTask)
// });
// test('CHANGE STATUS TASK', () => {
//     const newTitle = 'React'
//     const action = changeTaskTitleAC('1', newTitle, todolistId1, 0)
//     const endState = tasksReducer(startState, action);
//     expect(endState[todolistId1][0].title).toBe('React');
//     // expect().toBe();
// })
// test('CHANGE TASK', () => {
//     const action = changeTaskStatusAC("1", 3, todolistId1);
//     const endState = tasksReducer(startState, action)
//     expect(endState[todolistId1][0].status).toBe(3);
// });
// test('SET TASKS BEFORE SET TODOLISTS', () => {
//     const action = setTodolistsAC([
//         {id: '1', title: 'title1', order: 0, addedDate: ''},
//         {id: '2', title: 'title2', order: 0, addedDate: ''},
//     ])
//     const endState = tasksReducer({}, action)
//     const keys = Object.keys(endState)
//     expect(keys.length).toBe(2)
//     expect(endState['1']).toStrictEqual([])
//     expect(endState['2']).toStrictEqual([])
//
// })
// test('SET TASKS to TODOLIST', () => {
//     const action = setTasksAC(startState[todolistId2], todolistId1)
//     const endState = tasksReducer({
//         [todolistId1]: [],
//         [todolistId2]: []
//     }, action)
//     expect(endState[todolistId1].length).toBe(3)
//     expect(endState[todolistId2].length).toBe(0)
//
// })