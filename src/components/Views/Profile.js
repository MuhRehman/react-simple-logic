import React, { Component, Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
//import "./App.css";

//import "bootstrap/dist/css/bootstrap.css";
//import "mqtt/dist/mqtt.js";

class Profile extends Component {
  state = {
    drawer: false,
    anchorEl: ""
  };
  constructor(props) {
    super(props);

    // TODO don't forget to add your app and js ids
  }

  seeUser = () => {
    return JSON.stringify(this.props.user);
  };

  render() {
    return (
      <Fragment>
        <Typography>{this.seeUser()}</Typography>
        Profile View.. You can see your profile
        <Button onClick={this.props.DALObj.handleSignOut}> Sign-out </Button>
      </Fragment>
    );
  }
}

export default Profile;
