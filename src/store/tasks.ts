export const addSalary = (salary: number, bonus: number) => salary + bonus
export const fallSalary = (salary: number, minus: number) => salary - minus
export const multSalary = (salary: number, coefficient: number) => salary * coefficient
export const divideSalary = (salary: number, coefficient: number) => salary * coefficient

// 1. в параметрах у всех есть salary
// 2. название функции отражает тип действия (type of action)
// 3. дополнительные значения для каждого типа действия

export type AddSalaryActionType = {
    type: 'ADD_SALARY'
    bonus: number
}
export type FallSalaryActionType = {
    type: 'FALL_SALARY'
    minus: number
}
export type MultSalaryActionType = {
    type: 'MULT_SALARY'
    coefficient: number
}
export type DivideSalaryActionType = {
    type: 'DIVIDE_SALARY'
    coefficient: number
}
export type ActionType = AddSalaryActionType | FallSalaryActionType | MultSalaryActionType | DivideSalaryActionType

export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case 'ADD_SALARY':
            return salary + action.bonus
        case 'FALL_SALARY':
            return salary - action.minus
        case 'MULT_SALARY':
        case 'DIVIDE_SALARY':
            return salary * action.coefficient
        default:
            return salary
    }
}