// imports
import React from 'react'
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {Container} from "@mui/material";

export default {
    title: 'Custom Input Component',
    component: Task,
}

// actions
const changeTaskStatus = action('Task status changed!')
const removeTask = action('Task removed!')
const updateTask = action('Task updated!')

// components
export const CustomInputStories = () => {
    return (
        <Container maxWidth="sm">

            <Task id={'1234-1234-rewq-qwer-1234'}
                  status={0}
                  title={'Example title'}
                  callbackChangeTaskStatus={changeTaskStatus}
                  callbackUpdateTask={updateTask}
                  onClickHandler={removeTask}
            />
            <Task id={'qwer-qwer-qwer-qwer-qwer'}
                  status={0}
                  title={'Example title two'}
                  callbackChangeTaskStatus={changeTaskStatus}
                  callbackUpdateTask={updateTask}
                  onClickHandler={removeTask}
            />
        </Container>

    )
}
