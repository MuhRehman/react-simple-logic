import "mqtt/mqtt";

export default class Messenger1 {
  constructor() {
    //super(props);
    this.conStatus = "";
    this.mqtt = require("mqtt");
    this.motherPassKey = "default"; //you will get it from firebase
    this.txtConStr = "tcp://choroid.net:8083"; // you will get it from firebase
    this.listenerChannel = "defaultPub"; // you will get this from firebase dont worry
    this.mqttClient = {};
    this.devices = [];
    this.handleConnect(this.mqtt);
  }

  handleConnect = () => {
    try {
      this.mqttClient = this.mqtt.connect(this.txtConStr);
      this.mqttClient.on("connect", this.onConnect);
      this.mqttClient.on("disconect", this.onDisConnect);
      this.mqttClient.on("message", this.handleRecMsg);
    } catch (e) {
      console.log(e);
      this.conStatus = "failed to connect";
    }
  };

  onConnect = packetConnak => {
    this.conStatus = "Connected";
    console.log(this.conStatus);
    this.mqttClient.subscribe(this.listenerChannel);

    for (var i = 0; i < this.devices.length; i++) {
      this.devices[i].onConnect();
    }
  };

  onDisConnect = packetConnak => {
    this.conStatus = "Disconnected";
    this.handleConnect();
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

  registerDevice = (deviceId, onReceive, onConnect) => {
    this.devices.push({
      deviceId: deviceId,
      callbackFunc: onReceive,
      onConnect: onConnect
    });
  };

  searchDevice = deviceId => {
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i].deviceId === deviceId) {
        return this.devices[i];
      }
    }
  };

  handleSend = (publishChannel, str) => {
    if (this.mqttClient.connected) {
      this.mqttClient.publish(publishChannel, this.myStringyfy(str));
      /// look for response msg.
    } else {
      console.log(
        "Someone wants to send msgs while there is no connection etablished"
      );
    }
  };

  handleSubscribe = () => {
    if (this.mqttClient.connected) {
      this.mqttClient.subscribe(this.listenerChannel);
      //mqttClient.on("message", this.handleRecMsg);
      //this.setState({ txtRecTopic: "" });
    } else {
      console.log("There is no SET connection to the Server");
    }
  };

  handleRecMsg = (topic, msg) => {
    // new message arrived. First convert it from Json to JS Object
    var recObj;
    recObj = JSON.parse(msg);

    var resultObject = this.searchDevice(recObj["deviceID"]);

    // Authentication
    if (resultObject !== undefined && recObj["passKey"] == this.motherPassKey) {
      // authenticated
      //console.log("found the device");
      resultObject.callbackFunc(recObj);
    } else {
      // You Received a message but the device is not registered so we have to ignore.
      console.log(
        "msg received but device who sent the msg was not registered"
      );
    }

    /*
      
      
      switch (recObj["msgType"]) {
        case "reply-set":
          this.handleReplySet(recObj);
          break;

        /* case "reply-get":
          handleReplyGet(recObj);
          break;
       
*/

    /*
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

    /*
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

    */
  };
}
