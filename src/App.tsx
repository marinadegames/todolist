import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const [tasks, setState] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: true},
        {id: 5, title: "Router-dom", isDone: true},
        {id: 6, title: "Good!", isDone: false},
    ])

    const [filterValue, setFilterValue] = useState('all')
    console.log(filterValue)

    let isDoneTrue = tasks;

    if (filterValue === 'ACTIVE') {
        isDoneTrue = tasks.filter(t => t.isDone)
    } else if (filterValue === 'COMPLETED') {
        isDoneTrue = tasks.filter(t => !t.isDone)
    }

    const filteredTasks = (value: string) => {
        setFilterValue(value)
    }

    const removeTask = (id: number) => {
        setState(tasks.filter(t => t.id !== id))
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={isDoneTrue}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}/>
        </div>
    );
}

export default App;
