// imports
import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/state";
import {CustomizedSnackbars} from "./Components/ErrorSnackBar";
import {initializedAppTC, StatusesType} from "./state/appReducer";
import {TodolistsList} from "./TodolistsList";
import {Routes, Route, NavLink} from 'react-router-dom';
import {Login} from "./Login/Login";
import {logoutTC} from "./state/authReducer";


// component
const App = memo(() => {

        const status = useSelector<rootReducerType, StatusesType>(state => state.app.status)
        const initialized = useSelector<rootReducerType, boolean>(state => state.app.isInitialized)
        const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(initializedAppTC())
        }, [])

        const logoutHandler = useCallback(() => {
            dispatch(logoutTC())
        }, [])


        if (!initialized) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '90vh'
                }}>
                    <CircularProgress/>
                </div>
            )
        }



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

                        {isLoggedIn
                            ? <Button color='error' variant="contained" onClick={logoutHandler}>Log out</Button>
                            :
                            <NavLink to={'/login'}>
                                <Button color="success" variant="contained">Login</Button>
                            </NavLink>
                        }

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
