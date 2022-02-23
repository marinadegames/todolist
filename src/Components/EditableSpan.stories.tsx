// imports
import React from 'react'
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'EditableSpanStories',
    component: EditableSpan,
}

// actions
const callback = action('TITLE CHANGED')

// components
export const EditableSpanStories =  () => {
    return (
        <EditableSpan title={'Example'} callback={callback}/>
    )
}
