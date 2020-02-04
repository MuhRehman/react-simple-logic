import React, { Component } from "react";

import { Link } from "react-router-dom";



export default function OldAvatarBox(props) {
  {
    // const classes = useStyles();

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
        <div
          style={{
            paddingTop: "0px",
            paddingBottom: "0px"
          }}
        >
          <div
            style={{
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "5px",
              paddingRight: "5px"
            }}
          >
            <div className="row">
            <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn">
            <img src="./images/avatar.png" width="50px" height="50px"  alt="Rehman"/>
            <span class="caret"></span>
            </button>
                    <ul className="dropdown-menu dropdown-menu-right mt-2" style={{minWidth:"15rem"}}>
                       <li className="px-3 py-2">
                           <form className="form" role="form">
                                
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                              
                            </form>
                        </li>
                     
                    </ul>

                    <ul style={{listStyle:"none", paddingLeft:"0px",paddingTop:"2px",lineHeight: "1.3"}}>
                    <li> {helperRenderTitle()}</li>
                    <li>{helperRenderSubTitle()}</li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
