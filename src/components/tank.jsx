import React, { Component } from "react";
import "mqtt/mqtt";
import "../components/App-1.css";
import { Typography } from "@material-ui/core";

class Tank extends Component {
  state = {
    svgHeight: 550,
    svgWidth: 500,
    tankHeight: 0,
    tankWidth: 0,
    tankTop: 0,
    tankLeft: 0,
    tankOnethird: 0,

    waterHeight: 0, /// variable property-- Maximum is 300
    waterWidth: 0,
    waterTop: 0,
    waterLeft: 0,

    percentFilled: 30,
    //timeToFill: 10,
    upperThreshold: 0,
    lowerThreshold: 0,
    waterLevelLength: 0,
    lowerThresholdTop: 90,
    waterLevelLengthTop: 20
  };

  constructor(props) {
    super(props);
    this.state.svgWidth = window.innerWidth * 0.8;
    this.state.svgHeight = this.state.svgWidth * 1; // fixed variable
    //Fixed Variable
    this.state.upperThreshold = props.fullThreshold; ////fixed Variable
    this.state.lowerThreshold = props.lowThreshold; ////fixed Variable
    //this.state.timeToFill = props.timeToFill; //////////// True Variable
    this.state.tankHeight = this.state.svgHeight * 0.8;
    this.state.tankWidth = this.state.svgWidth * 0.65;
    this.state.tankTop = this.state.svgHeight * 0.15;
    this.state.tankLeft = this.state.svgWidth * 0.3;
    this.state.tankOnethird = this.state.tankWidth / 3;
    this.state.percentFilled = props.percentFilled; ////////True Variable
    this.state.waterHeight =
      this.state.tankHeight * (this.state.percentFilled / 100);
    this.state.waterWidth = this.state.tankWidth - 4;
    this.state.waterTop =
      this.state.tankTop + (this.state.tankHeight - this.state.waterHeight);
    this.state.waterLeft = this.state.tankLeft + 2;

    this.state.upperThresholdTop =
      this.state.tankTop +
      (this.state.tankHeight -
        (this.state.tankHeight * this.state.upperThreshold) / 100);

    this.state.lowerThresholdTop =
      this.state.tankTop +
      (this.state.tankHeight -
        (this.state.tankHeight * this.state.lowerThreshold) / 100);
  }

  componentDidUpdate() {}

  handleResize = () => {
    if (window.innerWidth < 600)
      this.setState({
        svgWidth: 600,
        svgHeight: 450
      });
    else
      this.setState({
        svgWidth: window.innerWidth * 0.8,
        svgHeight: this.state.svgWidth * 0.6
      });

    this.setState({ tankHeight: this.state.svgHeight * 0.75 }); // Variable
    this.setState({ tankWidth: this.state.svgWidth * 0.4 }); // Variable
    this.setState({ tankTop: this.state.svgHeight * 0.15 });
    this.setState({ tankLeft: this.state.svgWidth * 0.2 });
    this.setState({ tankOnethird: this.state.tankWidth / 3 });

    this.setState({
      waterHeight: this.state.tankHeight * (this.state.percentFilled / 100)
    });

    //this.state.percentFilled = props.percentFilled; ////////True Variable
    this.setState({
      waterHeight: this.state.tankHeight * (this.state.percentFilled / 100)
    });

    this.setState({ waterWidth: this.state.tankWidth - 4 });
    this.setState({
      waterTop:
        this.state.tankTop + (this.state.tankHeight - this.state.waterHeight)
    });
    this.setState({ waterLeft: this.state.tankLeft + 2 });
  };

  componentDidMount() {
    //this.handleResize();
    // window.addEventListener("resize", this.handleResize);
  }

  componentwillUnmount() {
    //window.removeEventListener("resize", this.handleResize);
  }
  /*this.setstate({ svgHeight: this.props.svgHeight });
    this.setstate({ svgWidth: this.props.svgWidth });
    this.setstate({ upperThreshold: this.props.upperThreshold }); ////////////////////Variable
    this.setstate({ lowerThreshold: this.props.lowerThreshold }); ////////////////////Variable
    this.setstate({ timeToFill: this.props.timeToFill }); //////////// Variable
    this.setstate({ tankHeight: this.state.svgHeight * 0.65 }); // Variable
    this.setstate({ tankWidth: this.state.svgWidth * 0.65 }); // Variable
    this.setstate({ tankTop: this.state.svgHeight * 0.1 });
    this.setstate({ tankLeft: this.state.svgWidth * 0.3 });
    this.setstate({ tankOnethird: this.state.tankWidth / 3 });
    this.setstate({ percentFilled: this.props.percentFilled }); //////////////////////////////// Variable
    this.setstate({
      waterHeight: this.state.tankHeight * (this.state.percentFilled / 100)
    });
    this.setstate({ waterWidth: this.state.tankWidth - 4 });
    this.setstate({
      waterTop:
        this.state.tankTop + (this.state.tankHeight - this.state.waterHeight)
    });
    this.setstate({ waterLeft: this.state.tankLeft + 2 });

    this.setstate({
      upperThresholdTop:
        this.state.tankTop +
        (this.state.tankHeight -
          (this.state.tankHeight * this.state.upperThreshold) / 100)
    });

    this.setstate({
      lowerThresholdTop:
        this.state.tankTop +
        (this.state.tankHeight -
          (this.state.tankHeight * this.state.lowerThreshold) / 100)
    });
  }

  }



  componentWillReceiveProps(nextProps) {
    this.setstate({ svgHeight: nextProps.svgHeight });
    this.setstate({ svgWidth: nextProps.svgWidth });
    this.setstate({ upperThreshold: nextProps.upperThreshold }); ////////////////////Variable
    this.setstate({ lowerThreshold: nextProps.lowerThreshold }); ////////////////////Variable
    this.setstate({ timeToFill: nextProps.timeToFill }); //////////// Variable
    this.setstate({ tankHeight: this.state.svgHeight * 0.65 }); // Variable
    this.setstate({ tankWidth: this.state.svgWidth * 0.65 }); // Variable
    this.setstate({ tankTop: this.state.svgHeight * 0.1 });
    this.setstate({ tankLeft: this.state.svgWidth * 0.3 });
    this.setstate({ tankOnethird: this.state.tankWidth / 3 });
    this.setstate({ percentFilled: nextProps.percentFilled }); //////////////////////////////// Variable
    this.setstate({
      waterHeight: this.state.tankHeight * (this.state.percentFilled / 100)
    });
    this.setstate({ waterWidth: this.state.tankWidth - 4 });
    this.setstate({
      waterTop:
        this.state.tankTop + (this.state.tankHeight - this.state.waterHeight)
    });
    this.setstate({ waterLeft: this.state.tankLeft + 2 });

    this.setstate({
      upperThresholdTop:
        this.state.tankTop +
        (this.state.tankHeight -
          (this.state.tankHeight * this.state.upperThreshold) / 100)
    });

    this.setstate({
      lowerThresholdTop:
        this.state.tankTop +
        (this.state.tankHeight -
          (this.state.tankHeight * this.state.lowerThreshold) / 100)
    });
  }
*/
  render() {
    // you should better update your parts here
    let lowThreshold =
      this.state.tankTop +
      (this.state.tankHeight -
        (this.state.tankHeight * this.props.lowThreshold) / 100);
    let fullThreshold =
      this.state.tankTop +
      (this.state.tankHeight -
        (this.state.tankHeight * this.props.fullThreshold) / 100);
    const percent = this.props.percentFilled;
    const waterHeight = this.state.tankHeight * (percent / 100);
    const waterTop = this.state.tankTop + (this.state.tankHeight - waterHeight);

    return (
      <React.Fragment>
        <svg
          width={this.state.svgWidth}
          height={this.state.svgHeight}
          style={{ float: "left" }}
        >
          <rect
            className="tank"
            x={this.state.tankLeft}
            y={this.state.tankTop}
            rx="20"
            ry="20"
            width={this.state.tankWidth}
            height={this.state.tankHeight}
          />
          <rect
            className="water"
            x={this.state.waterLeft}
            y={waterTop}
            width={this.state.waterWidth}
            height={waterHeight}
          />
          <line
            className="line1"
            x1={this.state.waterLeft}
            y1={waterTop}
            x2={this.state.waterLeft + 1.5 * this.state.tankOnethird}
            y2={waterTop}
          />
          <text
            class="heavy"
            x={this.state.waterLeft + 1.7 * this.state.tankOnethird}
            y={waterTop}
          >
            {" "}
            {percent.toFixed(0)} %{" "}
          </text>
          <line
            className="line2"
            x1={this.state.tankLeft - this.state.tankOnethird}
            y1={fullThreshold}
            x2={this.state.tankLeft}
            y2={fullThreshold}
          />
          <text
            class="heavy2"
            x={this.state.tankLeft - 1.2 * this.state.tankOnethird}
            y={fullThreshold - 20}
          >
            {" "}
            TL: {this.props.fullThreshold} %
          </text>
          <line
            className="line3"
            x1={this.state.tankLeft - this.state.tankOnethird}
            y1={lowThreshold}
            x2={this.state.tankLeft}
            y2={lowThreshold}
          />
          <text
            class="heavy2"
            x={this.state.tankLeft - 1.2 * this.state.tankOnethird}
            y={lowThreshold - 20}
          >
            {" "}
            LL: {this.props.lowThreshold} %
          </text>
          Sorry, your browser does not support inline SVG.
        </svg>
      </React.Fragment>
    );
  }
}

export default Tank;
