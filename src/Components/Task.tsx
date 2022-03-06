// imports
import React, {ChangeEvent} from "react";
import {Checkbox, Grid} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {CustomButton} from "./CustomButton";
import {TaskStatuses} from "../API/todolists-API";


// types
type TaskPropsType = {
    id: string
    status: number
    title: string
    callbackChangeTaskStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void
    callbackUpdateTask: (id: string, title: string) => void
    onClickHandler: (id: string) => void
}


// component
export const Task = React.memo((props: TaskPropsType) => {
    return (
        <Grid key={props.id}
              container
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              className={props.status === TaskStatuses.Completed ? "isDone" : ""}>
            <Checkbox
                onChange={(e) => props.callbackChangeTaskStatus(e, props.id)}
                checked={props.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.title}
                          callback={(title) => props.callbackUpdateTask(props.id, title)}/>
            <CustomButton name={''}

                          callback={() => props.onClickHandler(props.id)}/>

        </Grid>
    )
})
