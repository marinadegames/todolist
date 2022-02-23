// imports
import React from 'react'
import {action} from "@storybook/addon-actions";
import {CustomInput} from "./CustomInput";

export default {
    title: 'Custom Input Component',
    component: CustomInput,
}

// actions
const callback = action('TITLE CHANGED')

// components
export const CustomInputStories = () => {
    return (
        <CustomInput callback={callback} label={'Custom Input'}/>
    )
}
