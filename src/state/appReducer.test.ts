// imports
import {appReducer, setAppInitializedAC, setErrorAC, setStatusAC} from "./appReducer";

type InitStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
let startState: InitStateType

// init State
beforeEach(() => {
    startState  = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

// tests
test('error message should be set', () => {
    const endState = appReducer(startState, setErrorAC({error: 'error'}))
    expect(endState.error).toBe('error')
});
test('status should be correct', () => {
    const endState = appReducer(startState, setStatusAC({status: 'loading'}))
    expect(endState.status).toBe('loading')
})
test('is initialized app should be correct', () => {
    const endState = appReducer(startState, setAppInitializedAC({value: true}))
    expect(endState.isInitialized).toBe(true)
})