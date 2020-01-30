import "mqtt/mqtt";

export default class Messenger1 {
  constructor() {
    //super(props);
    this.conStatus = "";
    this.mqtt = require("mqtt");
    this.motherPassKey = "Mubeen"; //you will get it from firebase
    this.txtConStr = "tcp://choroid.net:8083"; // you will get it from firebase
    this.listenerChannel = "motherCh"; // you will get this from firebase dont worry
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
    var foundDevices = [];
    for (var i = 0; i < this.devices.length; i++) {
      if (this.devices[i].deviceId === deviceId) {
        foundDevices.push(this.devices[i]);
      }
    }

    return foundDevices;
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
    }
  };

  handleRecMsg = (topic, msg) => {
    // new message arrived. First convert it from Json to JS Object
    var recObj;
    recObj = JSON.parse(msg);

    var resultObject = [];
    resultObject = this.searchDevice(recObj["deviceID"]);

    // Authentication
    if (resultObject.length != 0 && recObj["passKey"] == this.motherPassKey) {
      // authenticated
      //console.log("found the device");
      loc;
      for (var i = 0; i < resultObject.length; i++) {
        resultObject[i].callbackFunc(recObj);
      }
    } else {
      // You Received a message but the device is not registered so we have to ignore.
      console.log(
        "msg received but device who sent the msg was not registered"
      );
    }
  };
}
