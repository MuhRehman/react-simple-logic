import React, { Component } from "react";
import "mqtt/mqtt";
import Tank from "./tank";

import { Typography, Card, CardHeader, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";

class TankMonitor extends Component {
  state = {
    deviceID: this.props.deviceID, //// Dont worry you will get this from firebase
    devicePasskey: "defaultPassKey", // will come from Firebase
    deviceChannel: "defaultSub", // will come from Firebase
    motorPin: 14, //Will come from firebase
    lightPin: 12, //will come from firebase

    motorImgSrc: "./images/MotorOff.png",
    lightImgSrc: "./images/Off.png",
    timeToFill: 0,
    percentFilled: 0,
    readingLastUpdate: 0,
    motorLastUpdated: 0,
    motorStatus: "",
    lowThreshold: 15,
    fullThreshold: 90
  };

  constructor(props) {
    super(props);

    this.props.messengerObj.registerDevice(
      this.state.deviceID,
      this.handleMsgRec,
      this.requestInitialData
    );
  }

  handleMsgRec = recObj => {
    switch (recObj["msgType"]) {
      case "reply-set":
        this.handleReplySet(recObj);
        break;

      case "reply-reading":
        this.handleReplyReading(recObj);
        break;
      /*
      case "reply-getSettings":
        handleGetSettings(recObj);
        break;

        case "reply-get":
        handleReplyGet(recObj);
        break;

      case "reply-setSettings":
        handleSetSettings(recObj);
        break;
*/
      case "autoUpdate":
        this.handleAutoUpdate(recObj);
        break;

      case "notification":
        this.handleNotification(recObj);
        break;
    }
  };

  handleImageClick = event => {
    if (event.target.id == "motorImg") {
      if (this.state.motorImgSrc == "./images/MotorOff.png") this.tmon();
      else this.tmoff();
    }

    ////// for the Light
    if (event.target.id == "lightImg") {
      if (this.state.lightImgSrc == "./images/Off.png") this.tlon();
      else this.tloff();
    }
    ///////////
  };

  requestInitialData = event => {
    let commandMsg = {
      deviceID: this.state.deviceID,
      passKey: this.state.devicePasskey,
      command: "reading"
    };

    this.props.messengerObj.handleSend(this.state.deviceChannel, commandMsg);

    //this.setState({ motorImgSrc: "./images/MotorOn.png" });
  };

  tmon = () => {
    let commandMsg = {
      deviceID: this.state.deviceID,
      passKey: this.state.devicePasskey,
      command: "set",
      item: this.state.motorPin,
      value: 1
    };

    this.props.messengerObj.handleSend(this.state.deviceChannel, commandMsg);

    //this.setState({ motorImgSrc: "./images/MotorOn.png" });
  };

  tlon = () => {
    let commandMsg = {
      deviceID: this.state.deviceID,
      passKey: this.state.devicePasskey,
      command: "set",
      item: this.state.lightPin,
      value: 1
    };

    this.props.messengerObj.handleSend(this.state.deviceChannel, commandMsg);

    //this.setState({ motorImgSrc: "./images/MotorOn.png" });
  };

  tmoff = () => {
    var commandMsg = {
      deviceID: this.state.deviceID,
      passKey: this.state.devicePasskey,
      command: "set",
      item: this.state.motorPin,
      value: 0
    };

    this.props.messengerObj.handleSend(this.state.deviceChannel, commandMsg);
    //this.setState({ motorImgSrc: "./images/MotorOff.png" });
  };

  tloff = () => {
    var commandMsg = {
      deviceID: this.state.deviceID,
      passKey: this.state.devicePasskey,
      command: "set",
      item: this.state.lightPin,
      value: 0
    };

    this.props.messengerObj.handleSend(this.state.deviceChannel, commandMsg);
  };

  handleReplyReading = obj => {
    if (obj["motor"] == 1) {
      this.setState({ motorImgSrc: "./images/MotorOn.png" });
      this.setState({ motorStatus: "Running" });
      this.setState({ motorLastUpdated: new Date().toString() });
    } else if (obj["motor"] == 0) {
      this.setState({ motorImgSrc: "./images/MotorOff.png" });
      this.setState({ motorStatus: "Off" });
      this.setState({ motorLastUpdated: new Date().toString() });
    }
    if (obj["light"] == 1) this.setState({ lightImgSrc: "./images/On.png" });
    else if (obj["light"] == 0)
      this.setState({ lightImgSrc: "./images/Off.png" });

    this.setState({ timeToFill: obj["timeTofill"] });
    this.setState({ percentFilled: obj["percent"] });
    this.setState({ lowThreshold: obj["lowThreshold"] });
    this.setState({ fullThreshold: obj["fullThreshold"] });
  };

  handleReplySet = obj => {
    if (obj["item"] == this.state.motorPin && obj["value"] == 1) {
      this.setState({ motorImgSrc: "./images/MotorOn.png" });
      this.setState({ motorStatus: "Running" });
      this.setState({ motorLastUpdated: new Date().toString() });
    } else if (obj["item"] == this.state.motorPin && obj["value"] == 0) {
      this.setState({ motorImgSrc: "./images/MotorOff.png" });
      this.setState({ motorStatus: "Off" });
      this.setState({ motorLastUpdated: new Date().toString() });
    }
    if (obj["item"] == this.state.lightPin && obj["value"] == 1)
      this.setState({ lightImgSrc: "./images/On.png" });
    else if (obj["item"] == this.state.lightPin && obj["value"] == 0)
      this.setState({ lightImgSrc: "./images/Off.png" });
  };

  handleAutoUpdate = obj => {
    this.setState({ timeToFill: obj["timeTofill"] });
    this.setState({ percentFilled: obj["percent"] });
    this.setState({ readingLastUpdate: new Date().toString() });
    this.handleReplySet(obj);
  };

  handleNotification = obj => {
    if (obj["item"] == this.state.motorPin && obj["value"] == 1) {
      this.setState({ motorImgSrc: "./images/MotorOn.png" });
      this.setState({ motorStatus: "Running" });
      this.setState({ motorLastUpdated: new Date().toString() });
    } else if (obj["item"] == this.state.motorPin && obj["value"] == 0) {
      this.setState({ motorImgSrc: "./images/MotorOff.png" });
      this.setState({ motorStatus: "Off" });
      this.setState({ motorLastUpdated: new Date().toString() });
    }
    if (obj["item"] == this.state.lightPin && obj["value"] == 1)
      this.setState({ lightImgSrc: "./images/On.png" });
    else if (obj["item"] == this.state.lightPin && obj["value"] == 0)
      this.setState({ lightImgSrc: "./images/Off.png" });
  };

  render() {
    let width = window.innerWidth;
    let height = width + 50;

    return (
      <React.Fragment>
        <Card style={{ flexDirection: "column" }}>
          <CardHeader
            title="Tank Status"
            subheader={"Last updated:" + this.state.readingLastUpdate}
          />

          <CardContent style={{ overflow: "overlay", padding: "0px" }}>
            <Tank
              //svgHeight={height}
              // svgWidth={width}
              percentFilled={this.state.percentFilled}
              fullThreshold={this.state.fullThreshold}
              lowThreshold={this.state.lowThreshold}
            />
          </CardContent>
          <CardContent style={{ overflow: "overlay", paddingLeft: "50px" }}>
            {" "}
            <Typography style={{ fontSize: "20px", fontWeight: "700" }}>
              {" "}
              {this.state.timeToFill.toFixed(0)} Minutes to Fill the tank{" "}
            </Typography>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Motor Status"
            subheader={"Last updated:" + this.state.motorLastUpdated}
          />

          <CardContent style={{ overflow: "overlay", paddingLeft: "0px" }}>
            <img
              id="motorImg"
              src={this.state.motorImgSrc}
              width="250"
              height="200"
              onClick={this.handleImageClick}
            />
          </CardContent>
        </Card>

        <div className="card">
          <h2> Light Status </h2>
          <img
            id="lightImg"
            src={this.state.lightImgSrc}
            width="200"
            height="220"
            onClick={this.handleImageClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TankMonitor;
