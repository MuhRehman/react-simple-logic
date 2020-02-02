import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
    usernameHelper: "",
    passwordHelper: "",
    error: ""
  };

  constructor(props) {
    super(props);

    //this.state.msgObj.registerDevice("DID02", this.handlerRec2);
    // TODO don't forget to add your app and js ids
  }

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
      this.props.DALObj.handleSignIn(
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
      //window.location = ;
      return <Redirect push to="/" />;
    }
    console.log(this.props.status);
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
            <CardHeader title=" Login Area" style={{ background: "#e3e4e8" }} />

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
                  Login{" "}
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
                  Dont have an account? <Link to="/signUp"> Sign Up Now </Link>
                </Typography>{" "}
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired
};

export default withWidth()(Login);
