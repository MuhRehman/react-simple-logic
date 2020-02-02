import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import {
  CardHeader,
  CardContent,
  Card,
  Button,
  Box,
  Typography
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
  state = {
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
    usernameHelper: "",
    passwordHelper: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      usernameError: false,
      passwordError: false,
      usernameHelper: "",
      passwordHelper: ""
    });

    // alert(event.target.value);
    //alert(event.target.id);
  };

  handleSubmit = event => {
    if (this.state.username == "") {
      this.setState({
        usernameError: true,
        usernameHelper: "Username can not be Blank"
      });
      event.preventDefault();
    } else if (this.state.password == "") {
      this.setState({
        passwordError: true,
        passwordHelper: "password can not be Blank"
      });
      event.preventDefault();
    } else {
      //Everything is Okay now go ahead.
      this.props.DALObj.handleSignUp(
        this.state.username,
        this.state.password,
        this.onSuccess,
        this.OnFail
      );

      event.preventDefault();

      // Show a spinner on the login Button // Loading state= true.
    }
  };

  onSuccess = () => {
    // stop the spinner.
    // loading completed.

    // take the user where-ever you want
    console.log("YEAH!!!");
  };

  OnFail = error => {
    // stop the spinner.
    // loading completed.
    this.setState({ error: error.message });
  };

  render() {
    if (this.props.status == true) {
      //this.props.DALObj.handleSignOut();
      return <Redirect push to="/" />;
    }

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          padding: "3%",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: this.props.width == "xs" ? "100%" : "60%",
            height: "auto",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Typography style={{ fontSize: "24px" }}>
            {" "}
            Welcome to Choroid Solutions{" "}
          </Typography>

          <Card elevation={3}>
            <CardHeader
              title=" SignUp Area"
              style={{ background: "#e3e4e8" }}
            />

            <CardContent style={{ justifyContent: "space-around" }}>
              <form
                style={{ display: "flex", flexWrap: "wrap" }}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <TextField
                  id="username"
                  type="email"
                  error={this.state.usernameError}
                  helperText={this.state.usernameHelper}
                  onChange={this.handleChange}
                  value={this.state.username}
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  label="User Name"
                  //margin="normal"
                  variant="outlined"
                />

                <TextField
                  id="password"
                  type="password"
                  error={this.state.passwordError}
                  helperText={this.state.passwordHelper}
                  value={this.state.password}
                  onChange={this.handleChange}
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  label="Password"
                  margin="normal"
                  variant="outlined"
                />

                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: "100%" }}
                  startIcon={<PersonIcon />}
                >
                  {" "}
                  Sign-Up{" "}
                </Button>
                <Box
                  style={{
                    paddingTop: "20px",
                    width: "100%",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  <Typography
                    style={{
                      color: "red",
                      fontWeight: "500",
                      alignSelf: "center"
                    }}
                  >
                    {" "}
                    {this.state.error}
                  </Typography>{" "}
                </Box>
              </form>

              <Box
                display="block"
                style={{
                  paddingTop: "5%",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                {" "}
                <Typography
                  style={{
                    //color: "d",
                    fontWeight: "500",
                    alignSelf: "center"
                  }}
                >
                  {" "}
                  Already have an account? <Link to="/login"> Login Now </Link>
                </Typography>{" "}
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
