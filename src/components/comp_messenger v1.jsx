import React, { Component } from "react";
import "mqtt/mqtt";
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";

class Comp_messenger extends Component {
  state = {
    txtConStr: "",
    txtTopic: "",
    txtMsg: "",
    txtRecTopic: "",
    txtRecMsg: [""],
    mqtt: {},
    mqClient: {},
    conStatus: ""
  };

  constructor(props) {
    super(props);

    this.state.mqtt = require("mqtt");
    this.handleConnect = this.handleConnect.bind(this);
  }

  handleConnect() {
    try {
      const mqttClient = this.state.mqtt.connect(this.state.txtConStr);
      mqttClient.on("connect", this.onConnect);
      mqttClient.on("message", this.handleRecMsg);
      this.setState({ mqClient: mqttClient });
    } catch (e) {
      this.setState({ conStatus: e });
    }
  }
  onConnect = packetConnak => {
    this.setState({ conStatus: "Connected Succesfully" });
  };

  handletxtConStrChange = event => {
    this.setState({ txtConStr: event.target.value });
  };

  handletxtTopicChange = event => {
    this.setState({ txtTopic: event.target.value });
  };

  handletxtMsgChange = event => {
    this.setState({ txtMsg: event.target.value });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSend;
    }
  };

  handleSend = () => {
    const mqttClient = this.state.mqClient;

    if (mqttClient.connected) {
      mqttClient.publish(this.state.txtTopic, this.state.txtMsg);
      this.setState({ txtMsg: "" });
    } else {
      alert("There is no SET connection to the Server");
    }
  };

  handletxtRecTopicChange = event => {
    this.setState({ txtRecTopic: event.target.value });
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
    // this.setState({ conStatus: "Connected Succesfully" });
    const newMsgArray = this.state.txtRecMsg;
    newMsgArray.push(msg);
    this.setState({ txtRecMsg: newMsgArray });
    console.debug(msg);
  };

  render() {
    let arr = this.state.txtRecMsg.slice();
    arr = arr.reverse();
    let msgcontents = arr.map((msg, index) => (
      <span key={index}> {msg.toString()} </span>
    ));

    return (
      <React.Fragment>
        <div className="card">
          <h2> Broker info </h2>
          <span> Broker Name (i.e tcp://choroid.net:8083) </span>
          <input id="txtConStr" onChange={this.handletxtConStrChange} />

          <button id="btnConnect" onClick={this.handleConnect}>
            {" "}
            Connect{" "}
          </button>
          <span>
            {" "}
            Status:{" "}
            <span style={{ color: "green" }}> {this.state.conStatus} </span>
          </span>
        </div>

        <div className="card">
          <h2> Publisher Side </h2>
          <span> Topic </span>
          <input id="txtTopic" onChange={this.handletxtTopicChange} />
          <br />
          <span> Message </span>
          <input
            id="txtMsg"
            onChange={this.handletxtMsgChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.txtMsg}
          />
          <button id="btnSend" onClick={this.handleSend}>
            {" "}
            Send{" "}
          </button>
        </div>

        <div className="card">
          <h2> Subscriber Side </h2>
          <span> Topic </span>
          <input id="txtTopic" onChange={this.handletxtRecTopicChange} />
          <button id="btnSubscribe" onClick={this.handleSubscribe}>
            {" "}
            Subscribe{" "}
          </button>
          <br />
          <span> Message </span>
          <div className="card" id="txtReceivedMsg" style={{ width: "100%" }}>
            {msgcontents}
          </div>
          bob
        </div>
      </React.Fragment>
    );
  }
}

export default Comp_messenger;

/*
var mqtt = require("mqtt");
    var client = mqtt.connect("tcp://test.mosquitto.org:8080");

    client.on("connect", function() {
      client.subscribe("mqttmessenger/bob/messagedump", function(err) {
        if (!err) {
          client.publish(
            "mqttmessenger/bob/messagedump",
            "React App Says Ciao"
          );
        }
      });
    });

    client.on("message", function(topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
*/




