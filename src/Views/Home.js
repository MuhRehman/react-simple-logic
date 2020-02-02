import React, { Component, Fragment } from "react";
import Padding from "../Component/Padding.js";

import TankMonitor from "../Component/TankMonitor";
import GateOpener from "../Component/GateOpener";
import { Redirect } from "react-router";

class Home extends Component {
  //messengerObj = {};

  constructor(props) {
    super(props);

    //this.state.messengerObj.registerDevice(this.state.deviceID, this.handlerRec);

    // TODO don't forget to add your app and js ids
  }
  componentWillMount() {}
  componentDidMount() {}

  render() {
    if (this.props.status == false) {
      //window.location = ;
      return <Redirect push to="/login" />;
    }

    if (this.props.messengerObj == undefined) console.log("khali hey");
    else console.log(this.props.messengerObj);

    return (
      <Fragment>
        <Padding height="5px"> {} </Padding>

        <TankMonitor messengerObj={this.props.messengerObj} deviceID="DID02" />
        <GateOpener messengerObj={this.props.messengerObj} deviceID="DID02" />
      </Fragment>
    );
  }
}

export default Home;
