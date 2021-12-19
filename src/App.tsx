//imports
import React, {useState} from 'react';
import s from './App.module.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

// types
export type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'


function App() {

    const [tasks, setState] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
        {id: v1(), title: "Router-dom", isDone: true},
        {id: v1(), title: "Good!", isDone: false},
    ])
    console.log(tasks)
    const removeTask = (id: string) => {
        setState(tasks.filter(t => t.id !== id))
    }

    const [filterValue, setFilterValue] = useState('all')

    let isDoneTrue = tasks;

    if (filterValue === 'ACTIVE') {
        isDoneTrue = tasks.filter(t => t.isDone)
    } else if (filterValue === 'COMPLETED') {
        isDoneTrue = tasks.filter(t => !t.isDone)
    }

    const filteredTasks = (value: FilterType) => {
        setFilterValue(value)
    }



    return (
        <div className="App">
            <h2 className={s.titleApplication}>My ToDo-lists:</h2>
            <hr/>
            <Todolist title="What to learn"
                      tasks={isDoneTrue}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}/>
        </div>
    );
}

export default App;
