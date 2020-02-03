import React from "react";

// import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// import withWidth from "@material-ui/core/withWidth";
import "./form.css";

import { Link } from "react-router-dom";

import MyIcon from "../MyIcon";

class DynamicMenu extends React.Component {
  renderMenu = () => {
    const styles = {};

    let model = this.props.model;
    let menudesign;

    if (this.props.direction == "horizontal") {
      menudesign = model.map(m => {
        return (
          <li className="nav-item">
            <Link className="nav-link" to={m.to}>
              <MyIcon styles={styles.icons} path={m.iconPath} />

              <text>{m.text}</text>
            </Link>
          </li>
        );
      });

      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#"></a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0"> {menudesign} </ul>
          </div>
        </nav>
      );
    }
  };

  render() {
    return (
      <div className="container-fluid" style={{ alignItems: "right" }}>
        {" "}
        {this.renderMenu()}{" "}
      </div>
    );
  }
}

export default DynamicMenu;
