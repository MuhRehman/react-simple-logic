import React from "react";

// import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// import withWidth from "@material-ui/core/withWidth";
import "./form.css";

import { Link } from "react-router-dom";

import MyIcon from "../MyIcon";
import LogoBox from "./LogoBox";

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

              <text style={{ color:"black"}}>{m.text}</text>
            </Link>
          </li>
        );
      });

      return (
        <div className="" style={{justifyItems:"space-between", flexDirection:"row"}}>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#e9e9e9", }}>
          <a class="navbar-brand" href="#">
            <LogoBox size="50px" img="50px" bgColor="trasparent" logoSrc="./images/logo.png" />
          </a>
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
            <ul className="navbar-nav  mt-2 mt-lg-0"> {menudesign}
             
             </ul>
             
          </div>
        </nav>
        <div className="my-2 my-lg-0">
               <h1>Rehman</h1>
             </div>
        </div>
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
