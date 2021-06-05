import React from "react";
import {
    CssBaseline,
    Grid,
    Typography,
} from "@material-ui/core";
import { AiOutlineMessage } from "react-icons/ai";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    linearGradient: {
        backgroundImage: 'linear-gradient(to bottom, #3A8DFF, #86B9FF)',
        opacity: '85%',
        zIndex: '-1',
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        backgroundImage: `url(/img/bg-img.png)`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        zIndex: '0',
        backgroundSize: 'cover',
        backgroundPosition: 'top left'
    },
    sansSerif: {
        fontFamily: 'sans-serif',
    },
}));

const SignTemplate = (props) => {
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={5} className={classes.backgroundImage} >
                <Grid className={classes.linearGradient}>
                    <Grid
                        style={{ height: '80%' }}
                        container
                        direction="column"
                        justify="center"
                        align="center"
                        alignItems="center">
                        <AiOutlineMessage size={'15%'} style={{ color: 'white' }} />

                        <Typography
                            className={classes.sansSerif}
                            variant="h4"
                            style={{
                                color: 'white',
                                paddingLeft: '15%',
                                paddingRight: '15%',
                            }}>
                            Converse with anyone with any language
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={8} md={7} elevation={6}>

                {props.children}

            </Grid>
        </Grid>
    )
}

export default SignTemplate;