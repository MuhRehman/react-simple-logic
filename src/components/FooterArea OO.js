import React from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { Z_FIXED } from "zlib";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  root: {
    //padding: theme.spacing(1, 1),
    //borderRadius: "0px",
    color: "grey",
    boxShadow: "0 0px 0px 0px rgba(0, 0, 0, .3)"
  },
  elevation1: {}
}));

export default function FooterArea(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      square
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        height: flexbox
      }}
    >
      {props.children}
    </Paper>
  );
}
