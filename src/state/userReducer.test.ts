// imports
import {userReducer} from "./userReducer";


// const
const INCREMENT_AGE = 'INCREMENT_AGE'
const INCREMENT_CHILDREN_COUNTER = 'INCREMENT_CHILDREN_COUNTER'
const CHANGE_USER_NAME = 'CHANGE_USER_NAME'


// tests userReducer
test ('AGE counter', () => {

    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Eugene'
    }

    const endState = userReducer(startState, {type: INCREMENT_AGE} )

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)


})
test ('CHILDREN_AGE counter', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: "Eugene"
    }

    const endState = userReducer(startState, {type: INCREMENT_CHILDREN_COUNTER })

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})
test ('CHANGE_USER_NAME', () => {
    const startState = {
        age: 20,
        childrenCount: 2,
        name: 'Eugene'
    }
    const newName = 'Elina'

    const endState = userReducer(startState, {type: CHANGE_USER_NAME, newName: newName})

    expect(endState.name).toBe(newName)
})