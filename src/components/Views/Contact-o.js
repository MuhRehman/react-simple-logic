import React, { Component, Fragment } from "react";
import TankMonitorSettings from "../TankMonitorSettings";
import TankMonitor from "../TankMonitor";
import Padding from "../Padding.js";
import { Redirect } from "react-router";
//import "./App.css";

//import "bootstrap/dist/css/bootstrap.css";
//import "mqtt/dist/mqtt.js";

export default class Contact extends Component {
  constructor(props) {
    super(props);

    // TODO don't forget to add your app and js ids
  }

  render() {
    if (this.props.status == false) {
      //window.location = ;
      return <Redirect push to="/login" />;
    }

    if (this.props.messengerObj == undefined)
      console.log(this.props.messengerObj);
    else console.log(this.props.messengerObj);

    return (
      <Fragment>
        <Padding height="5px"> {} </Padding>

        <TankMonitor messengerObj={this.props.messengerObj} deviceID="DID02" />

        <TankMonitorSettings />
      </Fragment>
    );
  }
}
