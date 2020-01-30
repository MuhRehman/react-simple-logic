import React, { Component } from "react";
import "mqtt/mqtt";
import Tank from "./tank";
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";
import { Typography, Card, CardHeader, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";

class Comp_messenger extends Component {
  state = {
    txtConStr: "tcp://choroid.net:8083",
    txtTopic: "defaultSub",
    txtMsg: "",
    txtRecTopic: "defaultPub",
    txtRecMsg: [""],
    mqtt: {},
    mqClient: {},
    conStatus: "",
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

    this.state.mqtt = require("mqtt");
    this.handleConnect = this.handleConnect.bind(this);
  }

  componentDidMount() {
    this.handleConnect();
  }

  handleConnect() {
    try {
      const mqttClient = this.state.mqtt.connect(this.state.txtConStr);
      mqttClient.on("connect", this.onConnect);
      mqttClient.on("disconect", this.onDisConnect);
      mqttClient.on("message", this.handleRecMsg);
      this.setState({ mqClient: mqttClient });
    } catch (e) {
      this.setState({ conStatus: e });
    }
  }
  onConnect = packetConnak => {
    this.setState({ conStatus: "Connected Succesfully" });
    const mqttClient = this.state.mqClient;
    mqttClient.subscribe(this.state.txtRecTopic);
    this.requestInitialData();
  };

  onDisConnect = packetConnak => {
    this.setState({ conStatus: "Disconnected" });
    this.handleConnect();
  };

  handleButtonClick = event => {
    this.setState({ conStatus: event.target.id });
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
      deviceID: "DID01",
      passKey: "defaultPassKey",
      command: "reading"
    };

    this.handleSend(this.myStringyfy(commandMsg));

    //this.setState({ motorImgSrc: "./images/MotorOn.png" });
  };

  tmon = () => {
    let commandMsg = {
      deviceID: "DID01",
      passKey: "defaultPassKey",
      command: "set",
      item: "14",
      value: 1
    };

    this.handleSend(this.myStringyfy(commandMsg));

    //this.setState({ motorImgSrc: "./images/MotorOn.png" });
  };

  tlon = () => {
    let commandMsg = {
      deviceID: "DID01",
      passKey: "defaultPassKey",
      command: "set",
      item: "12",
      value: 1
    };

    this.handleSend(this.myStringyfy(commandMsg));

    //this.setState({ motorImgSrc: "./images/MotorOn.png" });
  };

  tmoff = () => {
    var commandMsg = {
      deviceID: "DID01",
      passKey: "defaultPassKey",
      command: "set",
      item: "14",
      value: 0
    };

    this.handleSend(this.myStringyfy(commandMsg));
    //this.setState({ motorImgSrc: "./images/MotorOff.png" });
  };

  tloff = () => {
    var commandMsg = {
      deviceID: "DID01",
      passKey: "defaultPassKey",
      command: "set",
      item: "12",
      value: 0
    };

    this.handleSend(this.myStringyfy(commandMsg));
  };

  myStringyfy = obj => {
    //var keynames = Object.keys(obj);
    var finalStr = "{";
    var value;

    for (var key in obj) {
      finalStr += '"' + key + '"';
      finalStr += ":";
      value = obj[key];
      finalStr += '"' + value + '"';
      finalStr += ",";
    }
    finalStr = finalStr.slice(0, -1);
    finalStr += "}";
    return finalStr;
  };

  handleSend = str => {
    const mqttClient = this.state.mqClient;

    if (mqttClient.connected) {
      mqttClient.publish(this.state.txtTopic, str);
      /// look for response msg.
    }
  };

  handleSubscribe = () => {
    const mqttClient = this.state.mqClient;

    if (mqttClient.connected) {
      mqttClient.subscribe(this.state.txtRecTopic);
      //mqttClient.on("message", this.handleRecMsg);
      //this.setState({ txtRecTopic: "" });
    } else {
      alert("There is no SET connection to the Server");
    }
  };

  handleRecMsg = (topic, msg) => {
    // new message arrived. First convert it from Json to JS Object
    var recObj;
    recObj = JSON.parse(msg);

    // Authentication
    if (recObj["deviceID"] == "DID01" && recObj["deviceID"] == "DID01") {
      // authenticated
      switch (recObj["msgType"]) {
        case "reply-set":
          this.handleReplySet(recObj);
          break;

        /* case "reply-get":
          handleReplyGet(recObj);
          break;
       
*/
        case "reply-reading":
          this.handleReplyReading(recObj);
          break;
        /*
        case "reply-getSettings":
          handleGetSettings(recObj);
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
    }

    //if (recObj["msgType"]

    /// Now trigger the event of New Message with received Object as argument.

    const newMsgArray = this.state.txtRecMsg;
    newMsgArray.push(msg);
    this.setState({ txtRecMsg: newMsgArray });
    //console.debug(msg);
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
    if (obj["item"] == 14 && obj["value"] == 1) {
      this.setState({ motorImgSrc: "./images/MotorOn.png" });
      this.setState({ motorStatus: "Running" });
      this.setState({ motorLastUpdated: new Date().toString() });
    } else if (obj["item"] == 14 && obj["value"] == 0) {
      this.setState({ motorImgSrc: "./images/MotorOff.png" });
      this.setState({ motorStatus: "Off" });
      this.setState({ motorLastUpdated: new Date().toString() });
    }
    if (obj["item"] == 12 && obj["value"] == 1)
      this.setState({ lightImgSrc: "./images/On.png" });
    else if (obj["item"] == 12 && obj["value"] == 0)
      this.setState({ lightImgSrc: "./images/Off.png" });
  };

  handleAutoUpdate = obj => {
    this.setState({ timeToFill: obj["timeTofill"] });
    this.setState({ percentFilled: obj["percent"] });
    this.setState({ readingLastUpdate: new Date().toString() });
    this.handleReplySet(obj);
  };

  handleNotification = obj => {
    if (obj["item"] == 4 && obj["value"] == 1) {
      this.setState({ motorImgSrc: "./images/MotorOn.png" });
      this.setState({ motorStatus: "Running" });
      this.setState({ motorLastUpdated: new Date().toString() });
    } else if (obj["item"] == 4 && obj["value"] == 0) {
      this.setState({ motorImgSrc: "./images/MotorOff.png" });
      this.setState({ motorStatus: "Off" });
      this.setState({ motorLastUpdated: new Date().toString() });
    }
    if (obj["item"] == 5 && obj["value"] == 1)
      this.setState({ lightImgSrc: "./images/On.png" });
    else if (obj["item"] == 5 && obj["value"] == 0)
      this.setState({ lightImgSrc: "./images/Off.png" });
  };

  render() {
    let arr = this.state.txtRecMsg.slice();
    arr = arr.reverse();
    let msgcontents = arr.map((msg, index) => (
      <span key={index}> {msg.toString()} </span>
    ));

    let width = window.innerWidth;
    let height = width + 50;

    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Tank Monitor"
            subheader={"Last updated:" + this.state.readingLastUpdate}
          />

          <CardContent>
            <Tank
              //svgHeight={height}
              // svgWidth={width}
              percentFilled={this.state.percentFilled}
              fullThreshold={this.state.fullThreshold}
              lowThreshold={this.state.lowThreshold}
              timeToFill={this.state.timeToFill}
            />
          </CardContent>
        </Card>

        <div className="card">
          <span className="flleft">
            {" "}
            <h2> Motor Status: {this.state.motorStatus} </h2>{" "}
          </span>
          <text className="heavy2">
            ( Last updated: {this.state.motorLastUpdated} )
          </text>
          <br />
          <img
            id="motorImg"
            src={this.state.motorImgSrc}
            width="250"
            height="200"
            onClick={this.handleImageClick}
          />
        </div>

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

        <div className="card">
          <h2> Notifications </h2>
          <div className="card" id="txtReceivedMsg" style={{ width: "100%" }}>
            {msgcontents}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Comp_messenger.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired
};

export default withWidth()(Comp_messenger);
