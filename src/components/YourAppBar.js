import React, { Component, Fragment } from "react";
import "../App.css";
import { Paper } from "@material-ui/core";
import { flexbox } from "@material-ui/system";
import UpperLine from "./UpperLine";
import LowerLine from "./LowerLine";
import LogoBox from "./LogoBox";
import Contact from "./Views/Contact";

class YourAppBar extends Component {
  //const classes = useStyles();

  state = {
    size: "large",
    bgColor: "white",
    titleFont: "25px"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth >= 1250)
      this.setState({
        size: "large",
        bgColor: "#ffff",
        titleFont: "25px"
      });
    else if (window.innerWidth >= 960)
      this.setState({
        size: "medium",
        bgColor: "#ffff",
        titleFont: "24px"
      });
    else if (window.innerWidth >= 760)
      this.setState({
        size: "small",
        bgColor: "#ffff",
        titleFont: "20px"
      });
    else if (window.innerWidth <= 760)
      this.setState({
        size: "xSmall",
        bgColor: "#f9f9f9",
        titleFont: "18px"
      });
  };

  render() {
    return (
      <Fragment>
        <Paper
          id="Parent"
          square
          elevation={0}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: flexbox,
            background: "#ffff",
            alignContent: "center"
          }}
        >
          <UpperLine
            size={this.state.size}
            user={this.props.user}
            status={this.props.status}
            bgColor={this.state.bgColor}
            titleFont={this.state.titleFont}
            brandName="Choroid Solutions Pvt Ltd" // you can bring from config file
            brandSlogan="we make 'smart things'" // you can load from config file
            logoSrc="./images/logo.png" // load from config file
          />
          <LowerLine size={this.state.size} status={this.props.status} />
        </Paper>
      </Fragment>
    );
  }
}

export default YourAppBar;
