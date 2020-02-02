import React from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

//import AwesomeSlider from "react-awesome-slider";
//import "react-awesome-slider/dist/styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    //padding: theme.spacing(1, 1),
    //borderRadius: "0px",
    color: "grey"
    //boxShadow: "0 0px 0px 0px rgba(0, 0, 0, .3)"
  }
}));

export default function PromotionalArea(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classes.root}
      square
      elevation={0}
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        alignContent: "center",
        justifyItems: "center",
        // minWidth: "800px",
        height: props.height
      }}
    ></Paper>
  );
}
