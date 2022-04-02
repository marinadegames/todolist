// imports

import {authAPI, LoginParamsType} from "../API/todolists-API";
import {setErrorAC, setStatusAC} from "./appReducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


// initial state
let initialState = {
    isLoggedIn: false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})

// reducer
export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setStatusAC({status: 'idle'}))
            } else {
                if (resp.data.messages.length) {
                    dispatch(setErrorAC({error: resp.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'some error'}))
                }
            }
        })
        .catch(error => {
            console.warn(error)
            dispatch(setStatusAC({status: 'idle'}))
        })
    dispatch(setStatusAC({status: 'idle'}))
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(resp => {
            if (resp.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setStatusAC({status: 'succeeded'}))
            }
        })
        .catch(error => {
            console.warn(error)
        })
}

