import React, { Component, Fragment } from "react";
import Comp_messengerOld from "../Component/comp_messengerOld";
//import "./App.css";

//import "bootstrap/dist/css/bootstrap.css";
//import "mqtt/dist/mqtt.js";

class ServiceList extends Component {
  state = {
    drawer: false,
    anchorEl: ""
  };
  constructor(props) {
    super(props);

    // TODO don't forget to add your app and js ids
  }

  render() {
    return (
      <Fragment>
        <Comp_messengerOld />
      </Fragment>
    );
  }
}

export default ServiceList;
