import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const task1 = [
        {id:1, title:'HTML&CSS', isDone:true},
        {id:2, title:'JS', isDone:false},
        {id:3, title:'React', isDone:false},
    ]

    const task2 = [
        {id:1, title:'HTML&CSS', isDone:true},
        {id:2, title:'JS', isDone:true},
        {id:3, title:'React', isDone:false},
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} task={task1}/>

            <Todolist title={'What to drink'} task={task2}/>
        </div>
    );
}

export default App;
