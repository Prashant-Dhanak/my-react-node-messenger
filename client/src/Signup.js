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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    fontFamily: 'sans-serif',
  },
  sansSerif: {
    fontFamily: 'sans-serif',
  },
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
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <SignTemplate>
      <div className={classes.paper}>
        <Box width="75%" textAlign="right">
          <Typography className={classes.sansSerif} >Need to log in?
              <Button
              style={{
                backgroundColor: "white",
                padding: "18px 72px",
                color: "#3A8DFF",
                margin: 20,
              }}
              className={classes.sansSerif}
              variant="contained"
              size="large"
              onClick={() => history.push("/login")}>
              Login
              </Button>
          </Typography>
        </Box>
      </div>


      <Box className={classes.form} width="75%" textAlign="left">
        <Typography variant="h4" fontWeight="fontWeightBold" className={classes.sansSerif}>
          Create an account.
          </Typography>

      </Box>

      <form onSubmit={handleRegister} className={classes.form}>

        <Box width="75%">
          <TextField
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
          <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="password"
              inputProps={{ minLength: 6 }}
              aria-label="password"
              type="password"
              name="password"
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box width="75%">
          <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
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
