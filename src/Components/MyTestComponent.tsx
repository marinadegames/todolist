import React from "react";
import {
    Container,
    FormControl,
    FormControlLabel,
    FormLabel, Grid, Radio,
    RadioGroup, Rating, Slider, Switch, Typography,
} from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation'




export const MyTestComponent = () => {

    const [value, setValue] = React.useState<number | null>(2);

    return (
        <Container fixed>
            <Grid container style={{padding: '1rem 0', margin: '1rem 0'}}>

                <Switch  defaultChecked />

            </Grid>

        </Container>
    )

}