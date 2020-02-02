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
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import TankMonitor from "./TankMonitor";

class TankMonitorSettings extends Component {
  state = {
    ssid: "",
    ssidError: false,
    ssidHelper: "",

    password: "",
    passwordError: false,
    passwordHelper: "",

    deviceName: "",
    deviceNameError: false,
    deviceNameHelper: "",

    deviceDescription: "",
    deviceDescriptionError: false,
    deviceDescriptionHelper: "",

    fullTankDistance: "",
    devicefullTankDistanceError: false,
    fullTankDistanceHelper: "",

    emptyTankDistance: "",
    emptyTankDistanceError: false,
    emptyTankDistanceHelper: "",

    lowThreshold: "",
    lowThresholdError: false,
    lowThresholdHelper: "",

    upThreshold: "",
    upThresholdError: false,
    upThresholdHelper: "",

    watchFrequency: "",
    watchFrequencyError: false,
    watchFrequencyHelper: "",

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
            width: "70%",
            height: "auto",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Typography style={{ fontSize: "24px" }}>
            {" "}
            Settings of the Tank Monitor{" "}
          </Typography>

          <Card elevation={3}>
            <CardHeader
              title=" Device Settings Area"
              style={{ background: "#e3e4e8" }}
            />

            <CardContent style={{ justifyContent: "space-around" }}>
              <form
                style={{ display: "flex", flexWrap: "wrap" }}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="ssid"
                  label="wifi-ssid"
                  error={this.state.ssidError}
                  helperText={this.state.ssidHelper}
                  onChange={this.handleChange}
                  value={this.state.ssid}

                  //margin="normal"
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="password"
                  label="wifi-password"
                  error={this.state.passwordError}
                  helperText={this.state.passwordHelper}
                  onChange={this.handleChange}
                  value={this.state.password}

                  //margin="normal"
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="deviceName"
                  label="Device Name"
                  error={this.state.deviceNameError}
                  helperText={this.state.deviceNameHelper}
                  onChange={this.handleChange}
                  value={this.state.deviceName}

                  //margin="normal"
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="deviceDescription"
                  label="Device Description"
                  error={this.state.deviceDescriptionError}
                  helperText={this.state.deviceDescriptionHelper}
                  onChange={this.handleChange}
                  value={this.state.deviceDescription}

                  //margin="normal"
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="fullTankDistance"
                  label="Full Tank Distance"
                  error={this.state.fullTankDistanceError}
                  helperText={this.state.fullTankDistanceHelper}
                  onChange={this.handleChange}
                  value={this.state.fullTankDistance}

                  //margin="normal"
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="emptyTankDistance"
                  label="Empty Tank Distance"
                  error={this.state.emptyTankDistanceError}
                  helperText={this.state.emptyTankDistanceHelper}
                  onChange={this.handleChange}
                  value={this.state.emptyTankDistance}
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="lowThreshold"
                  label="Lower Threshold"
                  error={this.state.lowThresholdError}
                  helperText={this.state.lowThresholdHelper}
                  onChange={this.handleChange}
                  value={this.state.lowThreshold}
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="upThreshold"
                  label="Upper Threshold"
                  error={this.state.upThresholdError}
                  helperText={this.state.upThresholdHelper}
                  onChange={this.handleChange}
                  value={this.state.upThreshold}
                />

                <TextField
                  variant="outlined"
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    marginBottom: "10px"
                  }}
                  id="watchFrequency"
                  label="Watch Frequency"
                  error={this.state.watchFrequencyError}
                  helperText={this.state.watchFrequencyHelper}
                  onChange={this.handleChange}
                  value={this.state.watchFrequency}
                />

                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  style={{ width: "100%" }}
                  startIcon={<SettingsIcon />}
                >
                  {" "}
                  Update Settings{" "}
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
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default TankMonitorSettings;
