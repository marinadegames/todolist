import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./state/state";
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#a174d9'
        },
        secondary: {
            main: '#e3e9ff'
        },
        error: {
            main: '#e37482'
        },
        success: {
            main: '#2eac64',
            contrastText: '#e3e9ff'
        },
        background: {
            default: '#e3e9ff'
        },
        info: {
            main: '#29b6f6',
            contrastText: '#e3e9ff'
        }
    }
})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
