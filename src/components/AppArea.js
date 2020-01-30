import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

export default function AppArea(props) {
  return (
    <Paper
      square
      elevation={0}
      style={{
        width: "100%",
        height: "100%",
        paddingLeft: props.left,
        paddingRight: props.right,
        paddingTop: "1%"
      }}
    >
      {props.children}
    </Paper>
  );
}
