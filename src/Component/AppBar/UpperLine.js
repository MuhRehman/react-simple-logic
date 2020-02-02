import React, { Component, Fragment } from "react";
//import "../App.css";

import Typography from "@material-ui/core/Typography";
import AvatarBox from "./AvatarBox";
import MenuBox from "./MenuBox";
import LogoBox from "./LogoBox";

export default function UpperLine(props) {
  {
    const helperRender = () => {
      if (props.size == "xSmall") {
        return <MenuBox user={props.user} status={props.status} />;
      } else {
        return <AvatarBox user={props.user} status={props.status} />;
      }
    };

    return (
      <div
        id="UpperLineMainContainer"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "50px"
          //background: "#e8e4e4"
        }}
      >
        <LogoBox
          bgColor={props.bgColor}
          size="50px"
          img="40px"
          logoSrc={props.logoSrc}
        />
        <div
          id="restContainer"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "50px",
            background: props.bgColor,
            justifyContent: "space-between"
          }}
        >
          <div
            id="brandContainer"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
              height: "50px"
            }}
          >
            <div
              id="TitleBox"
              style={{
                display: "block",
                width: "auto",
                paddingRight: "5px",
                paddingLeft: "0px",
                overflow: "hidden"
              }}
            >
              <Typography
                style={{
                  fontSize: props.titleFont,
                  fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
                  fontWeight: "600",
                  lineHeight: "30px",
                  letterSpacing: "0em",
                  color: "#0c0c0c"
                }}
              >
                {props.brandName}
              </Typography>
            </div>

            <div
              id="SloganBox"
              style={{
                display: "fixed",
                width: "auto",
                //height: "20px",
                //paddingRight: "5px",
                paddingLeft: props.titleFont,
                backgroundColor: "#fffff"
              }}
            >
              <Typography
                style={{
                  fontSize: "15px",
                  fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
                  fontWeight: "600",
                  lineHeight: "15px",
                  letterSpacing: "0em",
                  color: "maroon"
                }}
              >
                {props.brandSlogan}
              </Typography>
            </div>
          </div>

          <div id="avatarBox">{helperRender()}</div>
        </div>
      </div>
    );
  }
}
