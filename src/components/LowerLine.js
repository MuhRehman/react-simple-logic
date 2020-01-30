import React, { Component } from "react";
//import "../App.css";
import DynamicMenu from "./DynamicMenu";

import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonIcon from "@material-ui/icons/Person";

import ContactPhoneOutlinedIcon from "@material-ui/icons/ContactPhoneOutlined";

import { fade, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import {
  ButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

export default function LowerLine(props) {
  {
    if (props.size == "xSmall") return null;

    if (props.status == false) return null;

    return (
      <DynamicMenu
        bgColor="#f9f9f9"
        color="black"
        direction="horizontal"
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
    );
  }
}
