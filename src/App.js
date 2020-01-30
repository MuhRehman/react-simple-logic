import React, { Component, Fragment } from "react";
//import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import "mqtt/dist/mqtt.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//////////////////

import AppArea from "./components/AppArea";
import Padding from "./components/Padding";
import PageArea from "./components/PageArea";

import FooterArea from "./components/FooterArea";

import YourAppBar from "./components/YourAppBar";
//import { withWidth } from "@material-ui/core";
//import withWidth from "@material-ui/core/withWidth";

import Home from "./components/Views//Home";
import ProductList from "./components/Views//ProductList";
import ServiceList from "./components/Views//ServiceList";
import Contact from "./components/Views//Contact";
import About from "./components/Views//About";
import DAL from "./components/Services/DAL";
import Login from "./components/Views//Login";
import SignUp from "./components/Views/SignUp";
import Profile from "./components/Views/Profile";
import Messenger1 from "./components/Services/Messenger";

class App extends Component {
  state = { loggedIn: "false", user: {}, appMargin: "5px" };
  DALObj = {};
  messengerObj = {};

  constructor(props) {
    super(props);
    this.DALObj = new DAL(this.isloggedIn);
    this.messengerObj = new Messenger1();

    //this.state.msgObj.registerDevice("DID02", this.handlerRec2);
    // TODO don't forget to add your app and js ids
  }

  /////////////////////
  isloggedIn = status => {
    if (status) {
      this.setState({ loggedIn: true, user: this.DALObj.user });
    } else {
      this.setState({ loggedIn: false, user: null });
    }

    console.log(this.state.loggedIn);
  };

  componentWillMount() {}

  ///////////////////////

  handleAppMargin = width => {};

  handleResize = () => {
    if (window.innerWidth <= 863)
      this.setState({
        appMargin: "0.5%"
      });
    else
      this.setState({
        appMargin: "5%"
      });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    ///////////////

    let width = window.innerWidth;

    ////////////

    return (
      <Fragment>
        {console.log("Main App View")}
        <AppArea left={this.state.appMargin} right={this.state.appMargin}>
          <Router>
            <YourAppBar user={this.state.user} status={this.state.loggedIn} />
            <Padding height="5px" />

            <PageArea>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home
                      {...props}
                      user={this.state.user}
                      status={this.state.loggedIn}
                      DALObj={this.DALObj}
                      messengerObj={this.messengerObj}
                    />
                  )}
                />

                <Route path="/products">
                  {" "}
                  <ProductList />{" "}
                </Route>
                <Route path="/services" component={ServiceList} />

                <Route
                  path="/contact"
                  render={props => (
                    <Contact
                    // {...props}
                    // user={this.state.user}
                    // status={this.state.loggedIn}
                    //   DALObj={this.DALObj}
                    //  messengerObj={this.messengerObj}
                    />
                  )}
                />

                <Route path="/about" component={About} />
                <Route
                  path="/login"
                  render={props => (
                    <Login
                      {...props}
                      user={this.state.user}
                      status={this.state.loggedIn}
                      DALObj={this.DALObj}
                    />
                  )}
                />
                <Route
                  path="/signUp"
                  render={props => (
                    <SignUp
                      {...props}
                      user={this.state.user}
                      status={this.state.loggedIn}
                      DALObj={this.DALObj}
                    />
                  )}
                />

                <Route
                  path="/profile"
                  render={props => (
                    <Profile
                      {...props}
                      user={this.state.user}
                      status={this.state.loggedIn}
                      DALObj={this.DALObj}
                    />
                  )}
                />

                <Route
                  path="/signout"
                  render={props => {
                    this.DALObj.handleSignOut();
                    return <Redirect push to="/" />;
                  }}
                />
              </Switch>
            </PageArea>
          </Router>

          <Padding height="100px" />
          <FooterArea>
            {/*    <img
              src={"./images/footer.png"}
              style={{
                width: "60%",
                height: "60%"
              }}
              alt={"Footer Area"}
            /> */}
          </FooterArea>
        </AppArea>
      </Fragment>
    );
  }
}

export default App;
