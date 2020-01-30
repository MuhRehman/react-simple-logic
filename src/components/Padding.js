import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { Z_FIXED } from "zlib";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    //padding: theme.spacing(1, 1),
    //borderRadius: "0px",
    //boxShadow: "0 0px 0px 0px rgba(0, 0, 0, .3)"
  },
  elevation1: {}
}));

export default function Padding(props) {
  const classes = useStyles();
  return (
    <Paper
      className={classes.root}
      square
      elevation={0}
      style={{
        display: "flex",
        width: "100%",
        height: props.height
      }}
    >
      {props.children}
    </Paper>
  );
}
