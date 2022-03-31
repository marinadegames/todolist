// imports
import {Dispatch} from "react";
import {authAPI, LoginParamsType} from "../API/todolists-API";
import {setErrorAC, setStatusAC} from "./appReducer";
import {createSlice} from "@reduxjs/toolkit";


// initial state
let initialState: InitialStateTypeAuth = {
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    }
})

slice.reducer

// reducer
export const authReducer = (state = initialState, action: ActionsTypeAuth): InitialStateTypeAuth => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.value} // immerJS

        default:
            return state
    }
}


// action creators
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET_IS_LOGGED_IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<any>) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('idle'))
            } else {
                if (resp.data.messages.length) {
                    dispatch(setErrorAC(resp.data.messages[0]))
                } else {
                    dispatch(setErrorAC('some error'))
                }
            }
        })
        .catch(error => {
            console.warn(error)
            dispatch(setStatusAC('idle'))
        })
    dispatch(setStatusAC('idle'))
}
export const logoutTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('succeeded'))
            }
        })
        .catch(error => {
            console.warn(error)
        })
}


// types
type InitialStateTypeAuth = {
    isLoggedIn: boolean
}
type ActionsTypeAuth = any