// imports
import {authAPI} from "../API/todolists-API";
import {setIsLoggedInAC} from "./authReducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";



// init state
const initialState: InitStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: StatusesType }>) {
            state.status = action.payload.status
        },
        setErrorAC(state, action: PayloadAction<{ error: string | null}>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})

// reducer
export const appReducer = slice.reducer
export const {setStatusAC, setErrorAC, setAppInitializedAC} = slice.actions

// TC
export const initializedAppTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setStatusAC({status: 'loading'}))
        const resp = await authAPI.me()
        if (resp.data.resultCode === 0) {
            dispatch(setStatusAC({status: 'idle'}))
            dispatch(setIsLoggedInAC({value: true}))
        } else {
            // handler error
        }
    } catch (error) {
        console.log(error)
    }
    dispatch(setAppInitializedAC({value: true}))
    dispatch(setStatusAC({status: 'idle'}))
}

// types
export type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitStateType = {
    status: StatusesType
    error: string | null
    isInitialized: boolean
}
