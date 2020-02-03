import React, { Component } from "react";
//import "../App.css";

// import { Paper } from "@material-ui/core";

export default function LogoBox(props) {
  {
    return (
      <div
        style={{
          display: "flex",
          width: props.size,
          height: props.size,
          // paddingTop: "5px",
          // paddingBottom: "5px",
          paddingLeft: "10px",
          paddingRight: "10px",
          background: props.bgColor,
          float: "left",
          display: "table"
        }}
      >
        <img
          src={props.logoSrc}
          style={{
            width: props.img,
            height: props.img
          }}
          alt={"Logo"}
        />
      </div>
    );
  }
}
