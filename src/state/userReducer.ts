

type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: string
}


export const userReducer = (state: StateType, action: ActionType) => {

    switch (action.type) {

        case 'INCREMENT_AGE':
            return {...state, age: state.age + 1}

        case 'INCREMENT_CHILDREN_COUNTER':
            return {...state, childrenCount: state.childrenCount + 1}

        case 'CHANGE_USER_NAME':
            return {...state, name: action.newName}

        default:
            throw new Error("I don't understand this action type")
    }

}