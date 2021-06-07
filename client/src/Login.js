import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Box,
  Typography,
  TextField,
  FilledInput,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { login } from "./store/utils/thunkCreators";
import SignTemplate from './SignTemplate'


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
  },
  submit: {
    padding: "18px 36px",
    margin: theme.spacing(3, 0, 2),
    textAlign: "center",
    backgroundColor: '#3A8DFF',
    width: '50%',
    fontFamily: 'Open Sans',
  },
  openSans: {
    fontFamily: 'Open Sans',
  },
  textField: {
    "& label span": {
      display:"none",
    }
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
<SignTemplate>

          <Box textAlign="right" position="end" fullWidth className={classes.paper}>
            <Button className={classes.openSans} disabled >Don’t have an account?</Button>
            <Button
                style={{
                  backgroundColor: "white",
                  padding: "18px 36px",
                  color: "#3A8DFF",
                  margin: 20,
                }}
                className={classes.openSans}
                variant="contained"
                size="large"
                onClick={() => history.push("/register")}>
                Create Account
              </Button>
          </Box>



        <Box className={classes.form} width="75%" textAlign="left">
          <Typography variant="h4"  className={classes.openSans}>
            Welcome back!
          </Typography>

        </Box>

        <form onSubmit={handleLogin} className={classes.form}>

          <Box width="75%">
            <TextField
              className={classes.textField}
              margin="normal"
              required
              aria-label="username"
              label="E-mail address"
              fullWidth
              autoFocus
              name="username"
              type="text"
            />
          </Box>
          <Box width="75%">
            <TextField
              className={classes.textField}
              margin="normal"
              required
              // endAdornment={<Button position="end">Kg</Button>}
              fullWidth
              label="Password"
              aria-label="password"
              type="password"
              name="password">
              </TextField>

          </Box>

          <Box width="75%" textAlign="center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              className={classes.submit}>
              Login
              </Button>
          </Box>

        </form>
</SignTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
