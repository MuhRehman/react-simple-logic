import React, { Component } from "react";
//import "../App.css";

export default function MyIcon(props) {
  {
    return (
      <img stroke="green"
        src={props.path}
        style={{
          height: "24px",
          minWidth: "32px",
          // color:"white"
          
        }}
        alt={"ico"}
      />
    );
  }
}
