// imports
import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {CustomInput} from "./Components/CustomInput";
import {TaskType, Todolist} from "./TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {addToDoListAC, toDoListsReducer} from "./state/toDoListsReducer";
export type FilterValuesType = "all" | "active" | "completed";

// types
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// component
function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasks, setTasks] = useState<TasksStateType>( {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    });

    // functions handler for ToDo
    function removeTodolist(id: string) {
        // setTodolists(todolists.filter(tl => tl.id != id));
        // delete tasks[id];
        // setTasks({...tasks});
        setTodolists(toDoListsReducer(todolists, {type: "REMOVE_TODOLIST", id}))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
        setTodolists(toDoListsReducer(todolists, {type: "CHANGE_TODOLIST_FILTER", filter: value, id: todolistId}))
    }
    function changeToDoListTitle(todolistId: string, title: string) {
        setTodolists(toDoListsReducer(todolists, {type: "CHANGE_TODOLIST_TITLE", title, id: todolistId}))
    }
    function addToDoList(title: string) {
        let newId = v1()
        setTodolists(toDoListsReducer(todolists, addToDoListAC(title, newId)))
        setTasks({...tasks, [newId]: []})

    }
    console.log(todolists)

    // functions handler for tasks
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }
    function changeStatusTask(id: string, isDone: boolean, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }
    function updateTask(todolistId: string, taskId: string, title: string) {

        //setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, title} : m)})
    }




    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <IconButton >
                        <Brightness4Icon color="disabled"/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid xs={12}
                      container
                      direction={'column'}
                      justifyContent="flex-start"
                      alignItems="center"
                      style={{padding: '1rem', margin: '1rem 0'}}>
                    <h2>Create new ToDo List:</h2>
                    <CustomInput label={'add ToDo list'} callback={addToDoList}/>
                </Grid>
                <Grid container
                      xs={12}
                      justifyContent="center"
                      alignItems="flex-start"
                      spacing={5}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: '1rem'}} variant="outlined">
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatusTask}
                                        filter={tl.filter}
                                        updateToDoList={changeToDoListTitle}
                                        updateTask={updateTask}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>
            {/*<MyTestComponent/>*/}
        </div>
    );
}

export default App;
