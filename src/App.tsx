// imports
import React, {memo} from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {useSelector} from "react-redux";
import {rootReducerType} from "./state/state";
import {CustomizedSnackbars} from "./Components/ErrorSnackBar";
import {StatusesType} from "./state/appReducer";
import {TodolistsList} from "./TodolistsList";
import {Routes, Route} from 'react-router-dom';
import {Login} from "./Login/Login";


// component
const App = memo(() => {

        // state
        const status = useSelector<rootReducerType, StatusesType>(state => state.app.status)

        // return
        return (
            <div className="App">
                <AppBar position="static">
                    {/*HEADER*/}
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
                        <CustomizedSnackbars/>
                        <IconButton>
                            <Brightness4Icon color="disabled"/>
                        </IconButton>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                    {/*HEADER*/}
                </AppBar>
                <Routes>
                    <Route path={'*'} element={<h1>404 NOT FOUND</h1>}/>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'login'} element={<Login/>}/>
                </Routes>
            </div>
        );

    }
)

export default App;
