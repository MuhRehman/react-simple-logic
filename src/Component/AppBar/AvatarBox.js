import React, { Component } from "react";
//import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import FolderIcon from "@material-ui/icons/Folder";
import {
  Paper,
  Avatar,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {},

  button: {
    margin: theme.spacing(1)
    //background: "white"
    //color: "#565353"
  },

  img: { backgroundColor: "transparent" }
}));

export default function AvatarBox(props) {
  {
    const classes = useStyles();

    function helperRenderTitle() {
      if (props.status == true) {
        return <Link to="/profile"> {props.user.email} </Link>;
      } else {
        return <Link to="/login"> Login </Link>;
      }
    }
    function helperRenderSubTitle() {
      if (props.status == true) {
        return <Link to="/signout"> Sign-out </Link>;
      } else {
        return <Link to="/signup"> Sign-up </Link>;
      }
    }

    return (
      <div
        Id="AvatarBox"
        style={{
          display: "flex",
          //width: "50px",
          height: "50px",
          //paddingTop: "0px",
          //paddingBottom: "0px",
          paddingBottom: "2px",
          //paddingRight: "5px",
          flexDirection: "row",
          //background: "#e3e4e8",
          float: "right"
          //display: "table"
        }}
      >
        <List
          style={{
            paddingTop: "0px",
            paddingBottom: "0px"
          }}
        >
          <ListItem
            style={{
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "5px",
              paddingRight: "5px"
            }}
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "transparent"
                }}
                classes={{ img: classes.img }}
                src="./images/avatar.png"
                variant="square"
              />
            </ListItemAvatar>
            <ListItemText
              primary={helperRenderTitle()}
              secondary={helperRenderSubTitle()}
            />
          </ListItem>
        </List>
      </div>
    );
  }
}
