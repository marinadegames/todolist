import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean

}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id:number) => void
    filteredTasks: (value:string) => void
}


export function Todolist(props: PropsType) {



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>     
        </div>
        <ul>

            {props.tasks.map( (t) => {
                return(
                    <li key={t.id}>

                        <input type="checkbox"
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => props.removeTask(t.id)}>
                            x
                        </button>
                    </li>
                )
            })}

        </ul>
        <div>


            <button onClick={ () => props.filteredTasks('ALL')}>All</button>
            <button onClick={ () => props.filteredTasks('ACTIVE')}>Active</button>
            <button onClick={ () => props.filteredTasks('COMPLETED')}>Completed</button>
        </div>
    </div>
}
