import React, {memo} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../state/authReducer";
import {rootReducerType} from "../state/state";
import {Navigate} from 'react-router-dom';
import {Typography} from "@mui/material";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = memo(() => {

        const dispatch = useDispatch()
        const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)


        const formik = useFormik({
            validate: (values) => {
                const errors: FormikErrorType = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Неправильный адрес почты!';
                }
                if (values.password.length < 3) {
                    errors.password = 'Пароль должен быть больше 3 символов!'
                }
                return errors;
            },

            initialValues: {
                email: '',
                password: '',
                rememberMe: false,
            },

            onSubmit: values => {
                dispatch(loginTC(values))
                formik.resetForm()
            },
        });

        if (isLoggedIn) return <Navigate to={'/'}/>

        return <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel style={{textAlign: "center", margin: '70px 0 0 0'}}>
                            <Typography variant={'h4'}>Hello, friend!</Typography>
                            <Typography variant={'h6'}>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </Typography>
                            <Typography variant={'h6'}>or use common test account credentials:</Typography>
                            <Typography variant={'h6'}>Email: free@samuraijs.com</Typography>
                            <Typography variant={'h6'}>Password: free</Typography>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="email"
                                       margin="normal"
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            <TextField type={"password"}
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}
                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                                 checked={formik.values.rememberMe}/>}/>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    }
)