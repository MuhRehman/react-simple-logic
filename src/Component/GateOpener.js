import React, { Component } from "react";
import "mqtt/mqtt";

import { Typography, Card, CardHeader, CardContent } from "@material-ui/core";

class GateOpener extends Component {
  state = {
    deviceID: this.props.deviceID, //// Dont worry you will get this from firebase
    devicePasskey: "deviceDID02", // will come from Firebase
    deviceChannel: "deviceCh", // will come from Firebase
    //motorPin: 14, //Will come from firebase
    lightPin: 5, //will come from firebase

    motorImgSrc: "./images/MotorOff.png",
    lightImgSrc: "./images/Close.svg",
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
    ////// for the Light
    if (event.target.id == "lightImg") {
      if (this.state.lightImgSrc == "./images/Close.svg") this.tlon();
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

    //this.props.messengerObj.handleSend(this.state.deviceChannel, commandMsg);

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
    if (obj["light"] == 1) this.setState({ lightImgSrc: "./images/Open.svg" });
    else if (obj["light"] == 0)
      this.setState({ lightImgSrc: "./images/Close.svg" });
  };

  handleReplySet = obj => {
    if (obj["item"] == this.state.lightPin && obj["value"] == 1) {
      this.setState({ lightImgSrc: "./images/Open.svg" });
      setTimeout(this.tloff, 300);
      //this.tloff();
    } else if (obj["item"] == this.state.lightPin && obj["value"] == 0)
      this.setState({ lightImgSrc: "./images/Close.svg" });
  };

  handleAutoUpdate = obj => {
    this.handleReplySet(obj);
  };

  handleNotification = obj => {
    if (obj["item"] == this.state.lightPin && obj["value"] == 1) {
      this.setState({ lightImgSrc: "./images/Open.svg" });
      setTimeout(this.tloff, 300);
    } else if (obj["item"] == this.state.lightPin && obj["value"] == 0)
      this.setState({ lightImgSrc: "./images/Close.svg" });
  };

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Gate Opener"
            subheader={"Last updated:" + this.state.readingLastUpdate}
          />
          <CardContent>
            <img
              id="lightImg"
              src={this.state.lightImgSrc}
              width="200"
              height="220"
              onClick={this.handleImageClick}
            />
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default GateOpener;
