import {
    addSalary,
    fallSalary,
    multSalary,
    divideSalary,
    AddSalaryActionType,
    salaryReducer,
    FallSalaryActionType, MultSalaryActionType, DivideSalaryActionType
} from "./tasks";

test('addSalary should be correctly', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const bonus: number = 250

    // 2. выполнение тестируемого кода
    const result = addSalary(salary, bonus)

    // 3. проверка результат
    expect(result).toBe(950)
})
test('fallSalary should be correctly', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const minus: number = 250

    // 2. выполнение тестируемого кода
    const result = fallSalary(salary, minus)

    // 3. проверка результат
    expect(result).toBe(450)
})
test('multSalary should be correctly', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const coefficient: number = 2

    // 2. выполнение тестируемого кода
    const result = multSalary(salary, coefficient)

    // 3. проверка результат
    expect(result).toBe(1400)
})
test('divideSalary should be correctly', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const coefficient: number = 0.5

    // 2. выполнение тестируемого кода
    const result = divideSalary(salary, coefficient)

    // 3. проверка результат
    expect(result).toBe(350)
})

test('case "ADD_SALARY" of salary reducer', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const action: AddSalaryActionType = {
        type: "ADD_SALARY",
        bonus: 300,
    }

    // 2. выполнение тестируемого кода
    const result = salaryReducer(salary, action)

    // 3. проверка результат
    expect(result).toBe(1000)
})
test('case "FALL_SALARY" of salary reducer', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const action: FallSalaryActionType = {
        type: "FALL_SALARY",
        minus: 300,
    }

    // 2. выполнение тестируемого кода
    const result = salaryReducer(salary, action)

    // 3. проверка результат
    expect(result).toBe(400)
})
test('case "MULT_SALARY" of salary reducer', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const action: MultSalaryActionType = {
        type: "MULT_SALARY",
        coefficient: 1.5,
    }

    // 2. выполнение тестируемого кода
    const result = salaryReducer(salary, action)

    // 3. проверка результат
    expect(result).toBe(1050)
})
test('case "MULT_SALARY" of salary reducer', () => {
    // тесты содержат три раздела:

    // 1. данные
    const salary: number = 700
    const action: DivideSalaryActionType = {
        type: "DIVIDE_SALARY",
        coefficient: 0.5,
    }

    // 2. выполнение тестируемого кода
    const result = salaryReducer(salary, action)

    // 3. проверка результат
    expect(result).toBe(350)
})