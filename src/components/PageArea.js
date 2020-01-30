import React from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography, Divider } from "@material-ui/core";
import { flexbox } from "@material-ui/system";
//import PageAreaHeader from "./PageAreaHeader";

const useStyles = makeStyles(theme => ({
  root: {
    //padding: theme.spacing(1, 1),
    //borderRadius: "0px",
    color: "grey",
    boxShadow: "0 0px 0px 0px rgba(0, 0, 0, .3)"
  },
  elevation1: {}
}));

export default function PageArea(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      square
      style={{
        display: "flex",
        width: "100%",
        height: flexbox,
        overflow: "hidden",
        flexDirection: "column"
      }}
    >
      {props.children}
    </Paper>
  );
}
