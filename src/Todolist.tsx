import React from "react";


type PropsType={
    title: string,
    task: Array<InArray>
}

type InArray={
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(value => {
                    debugger
                    return(
                        <li key={value.id}><input type="checkbox" checked={value.isDone}/> <span>{value.title}</span></li>
                    )
                })}
                {/*<li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}