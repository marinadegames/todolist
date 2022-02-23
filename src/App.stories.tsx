// imports
import React from 'react'
import App from "./App";
import {ReduxStoreProviderDecorator} from "../.storybook/ReduxStoreProviderDecorator";

export default {
    title: 'App With Redux Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


// components
export const AppBaseExampleStories = () => {
    return <App/>
}
