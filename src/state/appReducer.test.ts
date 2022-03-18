// imports
import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./appReducer";

// start State
let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})

// tests
test('correct error message should be set', () => {
    const endState = appReducer(startState, setErrorAC('error'))
    expect(endState.error).toBe('error')
});
test('correct status should be correct', () => {
    const endState = appReducer(startState, setStatusAC('loading'))
    expect(endState.status).toBe('loading')
})