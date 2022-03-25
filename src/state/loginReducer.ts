// imports

// types
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

// initial state
import {Dispatch} from "react";
import {authAPI, LoginParamsType} from "../API/todolists-API";
import {setErrorAC, setStatusAC} from "./appReducer";

let initialState = {}

// types
// export type TasksActionType =

// reducer
export const loginReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        default:
            return state
    }
}


// action creators
export const loginAC = () => {

}

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<any>) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then(resp => {
            if (resp.data.resultCode === 0) {

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