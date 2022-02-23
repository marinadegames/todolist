// imports
import React from 'react'
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Editable Span Component',
    component: EditableSpan,
}

// actions
const callback = action('TITLE CHANGED')

// components
export const EditableSpanStories =  () => {
    return (
        <EditableSpan title={'Start title'} callback={callback}/>
    )
}
