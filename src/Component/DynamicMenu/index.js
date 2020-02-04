import React from "react";

// import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// import withWidth from "@material-ui/core/withWidth";
import "./form.css";

import { Link } from "react-router-dom";

import MyIcon from "../MyIcon";
import AvatarBox from "../AppBar/AvatarBox";
import LogoBox from "./LogoBox";

class DynamicMenu extends React.Component {
  
  
  
  renderMenu = () => {
    const styles = {};

    let model = this.props.model;
    let menudesign;

    
      menudesign = model.map(m => {
        return (
          <li className="nav-item">
            <Link className="nav-link" to={m.to}>
              <MyIcon styles={styles.icons} path={m.iconPath} />

              <text style={{ color:this.props.color}}>{m.text}</text>
            </Link>
          </li>
        );
      });

      return ( menudesign );
    
  };

  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:this.props.bgColor}} role="navigation">
    <div className="container">
        <Link to="/" className="navbar-brand" href="#">
        <img src="./images/Logo.png" width="40px" height="40px" alt=""/>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
            &#9776;
        </button>
        <div className="collapse navbar-collapse" id="exCollapsingNavbar">
            <ul className="nav navbar-nav" >
            
            {this.renderMenu()} 
            
                      
                      
            </ul>
            <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                <li className="nav-item order-2 order-md-1"><a href="#" class="nav-link" title="settings"><i class="fa fa-cog fa-fw fa-lg"></i></a></li>
                <li className="dropdown order-1">
                 <AvatarBox user={this.props.user} status={this.props.status} />
                 
                </li>
            </ul>
        </div>
    </div>
</nav>

<div id="modalPassword" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h3>Forgot password</h3>
                <button type="button" className="close font-weight-light" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <p>Reset your password..</p>
            </div>
            <div className="modal-footer">
                <button className="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                <button className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
</div>
    );
  }
}

export default DynamicMenu;
