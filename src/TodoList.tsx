// imports
import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {CustomButton} from "./Components/CustomButton";
import {EditableSpan} from "./Components/EditableSpan";
import {CustomInput} from "./Components/CustomInput";
import {Button, ButtonGroup, Grid} from "@mui/material";
import {FilterValuesType} from "./state/toDoListsReducer";
import {Task} from "./Components/Task";
import {TaskStatuses, TaskType} from "./API/todolists-API";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/tasksReducer";


// types

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: number, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateToDoList: (todolistId: string, title: string) => void
}


// component
export const Todolist = React.memo((props: PropsType) => {

    console.log('=== TODOLIST ===')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [props.id])


    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onClickHandler = (tId: string) => {
        props.removeTask(tId, props.id)
    }

    const callbackChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>, tId: string) => {
        let newValueCheck = e.currentTarget.checked

        props.changeTaskStatus(
            tId,
            newValueCheck ? TaskStatuses.Completed : TaskStatuses.New,
            props.id)
    }, [])

    const callbackUpdateTask = (tId: string, title: string) => {
        props.updateTask(props.id, tId, title)
    }
    const callbackUpdateToDoLists = (title: string) => {
        props.updateToDoList(props.id, title)
    }

    const callbackAddTask = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id)
    }, [props.addTask, props.id])


    // FILTER

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.status);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status);
    }


    return (
        <div>
            <h2 style={{padding: '0', margin: '0'}}>
                <Grid container
                      style={{padding: '0 0 1rem 0'}}
                      justifyContent={'space-between'}
                      alignContent={'center'}>
                    <EditableSpan title={props.title}
                                  callback={(title) => callbackUpdateToDoLists(title)}/>
                    <CustomButton name={''} callback={removeTodolist}/>
                </Grid>
            </h2>
            <div style={{margin: '0 0 1rem 0'}}>
                <CustomInput callback={callbackAddTask} label={'add task'}/>
            </div>

            <Grid>
                {
                    tasksForTodolist.map(t => {


                        return (
                            <div key={t.id}>
                                <Task id={t.id}
                                      status={t.status}
                                      title={t.title}
                                      callbackChangeTaskStatus={callbackChangeTaskStatus}
                                      callbackUpdateTask={callbackUpdateTask}
                                      onClickHandler={onClickHandler}
                                />
                            </div>

                        )
                    })
                }
            </Grid>
            <Grid container
                  style={{margin: '1rem 0 0 0'}}
                  justifyContent={'center'}
                  alignItems={'center'}>
                <ButtonGroup aria-label="outlined button group">
                    <Button variant={props.filter === 'all' ? "contained" : "outlined"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={'success'}
                            variant={props.filter === 'active' ? "contained" : "outlined"}
                            className={props.filter === 'active' ? "active-filter" : ""}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={'secondary'}
                            variant={props.filter === 'completed' ? "contained" : "outlined"}
                            className={props.filter === 'completed' ? "active-filter" : ""}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </Grid>
        </div>
    )
})



