// imports
import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {CustomInput} from "./Components/CustomInput";
import {Todolist} from "./TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {
    addToDoListAC,
    ChangeToDoListFilterAC,
    changeToDoListTitleAC, changeTodolistTitleTC, createTodolistTC, fetchTodolistsTC,
    FilterValuesType,
    removeToDoListAC, removeTodolistsTC, TodolistDomainType,
} from "./state/toDoListsReducer";
import {
    addTaskTC,
    changeTaskTitleAC, deleteTasksTC,
    TasksStateType, updateTaskStatusTC,
} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/state";


// component
const App = memo(() => {
        console.log('=== APP ===')
        // state
        const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)
        const todolists = useSelector<rootReducerType, Array<TodolistDomainType>>(state => state.todolists)
        const dispatch = useDispatch()

        // API
        useEffect(() => {
            dispatch(fetchTodolistsTC())
        }, [dispatch])

        // functions handler for ToDo
        const removeTodolist = useCallback((id: string) => {
            // dispatch(removeToDoListAC(id))
            dispatch(removeTodolistsTC(id))
        }, [dispatch])

        const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
            dispatch(ChangeToDoListFilterAC(todolistId, value))
        }, [dispatch])

        const changeToDoListTitle = useCallback((todolistId: string, title: string) => {
            // dispatch(changeToDoListTitleAC(todolistId, title))
            dispatch(changeTodolistTitleTC(todolistId, title))
        }, [dispatch])

        const addToDoList = useCallback((title: string) => {
            // dispatch(addToDoListAC(title))
            dispatch(createTodolistTC(title))
        }, [dispatch])


        // functions handler for tasks
        const removeTask = useCallback((id: string, todolistId: string) => {
            // dispatch(removeTaskAC(id, todolistId))
            dispatch(deleteTasksTC(todolistId, id))
        }, [dispatch])

        const addTask = useCallback((title: string, todolistId: string) => {
            // dispatch(addTaskAC(title, todolistId))
            dispatch(addTaskTC(todolistId, title))
        }, [dispatch])

        const changeStatusTask = useCallback((id: string, status: number, todolistId: string) => {
            // dispatch(changeTaskStatusAC(id, status, todolistId))
            dispatch(updateTaskStatusTC(id, todolistId, status))
        }, [dispatch])

        const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
            dispatch(changeTaskTitleAC(taskId, title, todolistId, 0))


        }, [dispatch])


        // return
        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <IconButton>
                            <Brightness4Icon color="disabled"/>
                        </IconButton>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid xs={12}
                          container
                          item={true}
                          direction={'column'}
                          justifyContent="flex-start"
                          alignItems="center"
                          style={{padding: '1rem', margin: '1rem 0'}}>
                        <h2>Create new ToDo List:</h2>
                        <CustomInput label={'add ToDo list'} callback={addToDoList}/>
                    </Grid>
                    <Grid container
                          item={true}
                          xs={12}
                          justifyContent="center"
                          alignItems="flex-start"
                          spacing={5}>
                        {
                            todolists.map(tl => {


                                let allTodolistTasks = tasks[tl.id];
                                let tasksForTodolist = allTodolistTasks;


                                return <Grid item key={tl.id}>
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
            </div>
        );
    }
)

export default App;
