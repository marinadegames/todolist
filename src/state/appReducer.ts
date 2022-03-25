// imports


// init state
import {Dispatch} from "react";
import {authAPI} from "../API/todolists-API";
import {setIsLoggedInAC} from "./authReducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

// reducer
export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        case "APP/SET_INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

// AC
export const setStatusAC = (status: StatusesType) => ({type: "APP/SET_STATUS", status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET_INITIALIZED', value} as const)


// TC
export const initializedAppTC = () => async (dispatch: Dispatch<any>) => {
    try{
        dispatch(setStatusAC('loading'))
        const resp = await authAPI.me()
        if (resp.data.resultCode === 0) {
            dispatch(setStatusAC('idle'))
            dispatch(setIsLoggedInAC(true))
        }
        else {

        }
    }
    catch (error){

    }
    dispatch(setAppInitializedAC(true))
    dispatch(setStatusAC('idle'))
}

// types
export type InitialStateType = {
    status: StatusesType
    error: string | null
    isInitialized: boolean
}
export type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionType =
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setAppInitializedAC>
