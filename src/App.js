import React, { Component, Fragment } from "react";

import UserOne from "./Component/UserOne";
import Home from "./Views/Home";
export default class App extends Component {
  state = {
    usertext :"",
  }
  userinfoChange=(e) => {
    this.setState({usertext:e.target.value})
  }
  render() {
    return (
      <div className="container">
      <UserOne mainName={this.state.usertext} 
      handlerName={this.userinfoChange}></UserOne>
      <UserOne mainName={this.state.usertext}
       handlerName={this.userinfoChange}></UserOne>
        <Home rehmanName={this.state.usertext}></Home>
      </div>
    )
  }
}


