import React, { Component, Fragment } from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { database } from "firebase";
//import "./App.css";

//import "bootstrap/dist/css/bootstrap.css";
//import "mqtt/dist/mqtt.js";

class ProductList extends Component {
  state = {
    drawer: false,
    anchorEl: ""
  };
  constructor(props) {
    super(props);

    // TODO don't forget to add your app and js ids
  }

  render() {
    return (
      <Fragment>
        <Card>
          <CardHeader title="Ci-Water Tank" subheader="Products" />{" "}
          <CardContent>
            <Typography>
              Version A: Monitors the water level of the water tank upstairs.
              Automatically turns the motor pump when a certain threshold is
              reached. All the reports available to you on your phone through
              Choroid App. You can change all the levels and also turn the motor
              on/off whenever you want using the same App. o Version- B: it has
              all the same features of version A. But it also monitors the
              underground water tank. Hence this version monitors two water
              tanks.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Ci-Water Tank" subheader="Products" />{" "}
          <CardContent>
            <Typography>
              Version A: Monitors the water level of the water tank upstairs.
              Automatically turns the motor pump when a certain threshold is
              reached. All the reports available to you on your phone through
              Choroid App. You can change all the levels and also turn the motor
              on/off whenever you want using the same App. o Version- B: it has
              all the same features of version A. But it also monitors the
              underground water tank. Hence this version monitors two water
              tanks.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Ci-Water Tank" subheader="Products" />{" "}
          <CardContent>
            <Typography>
              Version A: Monitors the water level of the water tank upstairs.
              Automatically turns the motor pump when a certain threshold is
              reached. All the reports available to you on your phone through
              Choroid App. You can change all the levels and also turn the motor
              on/off whenever you want using the same App. o Version- B: it has
              all the same features of version A. But it also monitors the
              underground water tank. Hence this version monitors two water
              tanks.
            </Typography>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default ProductList;
