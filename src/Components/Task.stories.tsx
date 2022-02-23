// imports
import React from 'react'
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
        <Task id={'1234-1234-rewq-qwer-1234'}
              isDone={false}
              title={'Example title'}
              callbackChangeTaskStatus={changeTaskStatus}
              callbackUpdateTask={updateTask}
              onClickHandler={removeTask}
        />
    )
}
