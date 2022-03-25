// imports
import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/state";
import {CustomizedSnackbars} from "./Components/ErrorSnackBar";
import {initializedAppTC, StatusesType} from "./state/appReducer";
import {TodolistsList} from "./TodolistsList";
import {NavLink, Route, Routes} from 'react-router-dom';
import {Login} from "./Login/Login";
import {logoutTC} from "./state/authReducer";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import NightlightSharpIcon from '@mui/icons-material/NightlightSharp';

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
                    height: '100vh'
                }}>
                    <CircularProgress/>
                </div>
            )
        }

        return (
            <Container sx={{padding: '2rem', height: '100vh'}} maxWidth={false}>

                {/*HEADER*/}
                <AppBar position="static" sx={{padding: '1rem', borderRadius: 3}}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <NightlightSharpIcon/>
                        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>Moon!task</Typography>
                        <CustomizedSnackbars/>

                        {isLoggedIn
                            ? <Button color='error' variant="contained" onClick={logoutHandler}>Log out</Button>
                            :
                            <NavLink to={'/login'} style={{textDecoration: 'none'}}>
                                <Button color="success" variant="contained">Login</Button>
                            </NavLink>
                        }

                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                {/*HEADER*/}

                <Routes>
                    <Route path={'*'} element={<h1>404 NOT FOUND</h1>}/>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'login'} element={<Login/>}/>
                </Routes>
            </Container>
        );

    }
)

export default App;
