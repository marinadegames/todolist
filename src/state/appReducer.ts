// imports

// types
export type InitialStateType = {
    status: StatusesType
    error: string | null
}
type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionType = SetStatusAT | SetErrorAT
export type SetErrorAT = {
    type: 'APP/SET_ERROR'
    error: string | null
}
export type SetStatusAT = {
    type: 'APP/SET_STATUS'
    status: StatusesType
}

// init state
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
}

// reducer
export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

// AC
export const setStatusAC = (status: StatusesType): SetStatusAT => ({type: "APP/SET_STATUS", status})
export const setErrorAC = (error: string | null): SetErrorAT => ({type: 'APP/SET_ERROR', error})


