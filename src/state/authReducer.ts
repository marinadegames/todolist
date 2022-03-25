// imports
import {Dispatch} from "react";
import {authAPI, LoginParamsType} from "../API/todolists-API";
import {setErrorAC, setStatusAC} from "./appReducer";


// initial state

let initialState: InitialStateType = {
    isLoggedIn: false

}


// reducer
export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.value}
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
                dispatch(setStatusAC('succeeded'))
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


// types
type InitialStateType = {
    isLoggedIn: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedInAC>