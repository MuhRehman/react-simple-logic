import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export default function Padding(props) {
  return (
    <div
      className="container-fluid"
      style={{
        height: props.height
      }}
    >
      {props.children}
    </div>
  );
}
