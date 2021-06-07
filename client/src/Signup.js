import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { register } from "./store/utils/thunkCreators";
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
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <SignTemplate>
        <Box textAlign="right" position="end" fullWidth className={classes.paper}>
          <Button className={classes.openSans} disabled>Already have an account?</Button>
          <Button
            style={{
              backgroundColor: "white",
              padding: "18px 72px",
              color: "#3A8DFF",
              margin: 20,
            }}
            className={classes.openSans}
            variant="contained"
            size="large"
            onClick={() => history.push("/login")}>
            Login
          </Button>
        </Box>


      <Box className={classes.form} width="75%" textAlign="left">
        <Typography variant="h4" fontWeight="fontWeightBold" className={classes.openSans}>
          Create an account.
          </Typography>

      </Box>

      <form onSubmit={handleRegister} className={classes.form}>

        <Box width="75%">
          <TextField
            className={classes.textField}
            margin="normal"
            required
            aria-label="username"
            label="Username"
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
            aria-label="e-mail address"
            label="E-mail address"
            fullWidth
            name="email"
            type="email"
          />
        </Box>

        <Box width="75%">
            <TextField
              className={classes.textField}
              margin="normal"
              required
              fullWidth
              label="Password"
              inputProps={{ minLength: 6 }}
              aria-label="password"
              type="password"
              name="password"
            />
          </Box>

        <Box width="75%" textAlign="center">
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            className={classes.submit}>
            Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
