import React, { Component } from "react";
//import "../App.css";

import { Paper } from "@material-ui/core";

export default function MyIcon(props) {
  {
    return (
      <img
        src={props.path}
        style={{
          height: "24px",
          minWidth: "32px"
        }}
        alt={"ico"}
      />
    );
  }
}
