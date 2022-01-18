import React, {useState} from "react";
import {Avatar, Button, ButtonGroup, Grid, IconButton, Input, Stack, TextField} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CloseIcon from '@mui/icons-material/Close';
import FolderIcon from '@mui/icons-material/Folder';

export const MyTestComponent = () => {

    const [input, setInput] = useState('')

    const onChangeInput = (el: string) => {
        setInput(input + el)
    }

    const result = () => {
        setInput(eval(input))
    }
    const ClearInput = () => {
        setInput('')
    }

    return (
        <Grid container style={{margin: '5rem'}}>
            <TextField
                value={input}

                style={{margin: '0 0 1rem 0'}}/>
            <Grid container direction={'row'}>
                <Button onClick={() => onChangeInput('1')}>1</Button>
                <Button onClick={() => onChangeInput('2')}>2</Button>
                <Button onClick={() => onChangeInput('3')}>3</Button>
                <Button onClick={() => onChangeInput('*')}>*</Button>

            </Grid>
            <Grid container direction={'row'}>
                <Button onClick={() => onChangeInput('4')}>4</Button>
                <Button onClick={() => onChangeInput('5')}>5</Button>
                <Button onClick={() => onChangeInput('6')}>6</Button>
                <Button onClick={() => onChangeInput('-')}>-</Button>
            </Grid>
            <Grid container direction={'row'}>
                <Button onClick={() => onChangeInput('7')}>7</Button>
                <Button onClick={() => onChangeInput('8')}>8</Button>
                <Button onClick={() => onChangeInput('9')}>9</Button>
                <Button onClick={() => onChangeInput('+')}>+</Button>
            </Grid>
            <Grid container direction={'row'}>
                <Button onClick={() => onChangeInput('.')}>.</Button>
                <Button onClick={() => onChangeInput('0')}>0</Button>
                <Button onClick={() => onChangeInput('/')}>/</Button>
                <Button onClick={result} variant={'contained'}>=</Button>
            </Grid>
            <Grid container direction={'row'}>
                <Button onClick={ClearInput}>Clear</Button>
            </Grid>
            
        </Grid>
    )
}