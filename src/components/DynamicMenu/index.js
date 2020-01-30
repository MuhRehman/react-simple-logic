import React from "react";
import ReactDOM from "react-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { typography } from "@material-ui/system";
import MyIcon from "../MyIcon";

class DynamicMenu extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }

  renderMenu = () => {
    const styles = {
      list: { paddingTop: "0px", paddingBottom: "0px" }
    };

    let model = this.props.model;
    let menuUI;

    if (this.props.direction == "horizontal") {
      menuUI = model.map(m => {
        return (
          <List component="nav" style={styles.list}>
            <ListItem
              style={{ flaot: "left", color: this.props.color }}
              button
              component={Link}
              to={m.to}
            >
              <MyIcon path={m.iconPath} />

              <ListItemText primary={m.text} />
            </ListItem>
          </List>
        );
      });

      return (
        <div
          id="container"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "auto",
            background: this.props.bgColor
          }}
        >
          {menuUI}{" "}
        </div>
      );
    }

    if (this.props.direction == "vertical") {
      menuUI = model.map(m => {
        return (
          <ListItem
            style={{ flaot: "left", width: "100%", color: this.props.color }}
            button
            component={Link}
            to={m.to}
          >
            <MyIcon path={m.iconPath} />

            <ListItemText primary={m.text} />
          </ListItem>
        );
      });

      return (
        <div
          id="container"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "auto",
            background: this.props.bgColor
          }}
        >
          <List component="nav" style={{ width: "100%" }}>
            {" "}
            {menuUI}{" "}
          </List>
        </div>
      );
    }
  };

  render() {
    return (
      <div
        className={this.props.className}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          //padding: "1%",
          justifyContent: "left",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            height: "auto",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            whiteSpace: "nowrap",
            overflow: "visible"
          }}
        >
          {" "}
          {this.renderMenu()}
        </div>
      </div>
    );
  }
}

DynamicMenu.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired
};

export default withWidth()(DynamicMenu);
