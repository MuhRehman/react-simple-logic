import React, { Component } from "react";
//import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, ListItem } from "@material-ui/core";
import DynamicMenu from "../DynamicMenu";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AvatarBox from "./AvatarBox";

const useStyles = makeStyles(theme => ({
  root: {},
  appBar: {
    // Make the app bar z-index always one more than the drawer z-index
    zIndex: theme.zIndex.drawer + 1
  }
}));

export default function MenuBox(props) {
  {
    const classes = useStyles();

    const [state, setState] = React.useState({
      top: false
    });

    var handleClose = () => {
      setState({ ...state, top: false });
    };

    var handleOpen = () => {
      setState({ ...state, top: true });
    };

    var printMenu = () => {
      if (props.status == false) return null;
      else {
        return (
          <div
            className={classes.fullList}
            role="presentation"
            onClick={handleClose}
            onKeyDown={handleClose}
          >
            <DynamicMenu
              bgColor="#f9f9f9"
              color="black"
              direction="vertical"
              model={[
                {
                  key: "1",
                  text: "Home",
                  to: "/",
                  iconPath: "/images/home.svg"
                },

                {
                  key: "2",
                  text: "Products",
                  to: "/products",
                  iconPath: "/images/products.svg"
                },

                {
                  key: "3",
                  text: "Services",
                  to: "/services",
                  iconPath: "/images/services.svg"
                },

                {
                  key: "4",
                  text: "About Us",
                  to: "/about",
                  iconPath: "/images/about.svg"
                },

                {
                  key: "5",
                  text: "Contact Us",
                  to: "/contact",
                  iconPath: "/images/contact.svg"
                }
              ]}
            />

            <Divider />

            <List>
              <ListItem
                button
                component={AvatarBox}
                user={props.user}
                status={props.status}
              ></ListItem>
            </List>
          </div>
        );
      }
    };

    return (
      <Paper
        Id="mainContainer"
        square
        className={classes.appBar}
        elevation={0}
        style={{
          display: "flex",
          //width: "40px",
          height: "50px",
          textAlign: "center",
          //paddingRight: "10px",

          background: "#f9f9f9"
        }}
      >
        <IconButton
          aria-label="Menu"
          size="large"
          //className={classes.button}
          onClick={handleOpen}
        >
          <MenuIcon fontSize="50px" lingHeight="50px" />
        </IconButton>

        <Drawer anchor="left" open={state.top} onClose={handleClose}>
          {printMenu()}
        </Drawer>
      </Paper>
    );
  }
}
