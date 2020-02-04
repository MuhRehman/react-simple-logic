import React, { Component, Fragment } from "react";

import DynamicMenu from "../DynamicMenu";

class AppBar extends Component {
  //const classes = useStyles();
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <Fragment>
         <DynamicMenu
        bgColor="#f9f9f9"
        color="black"
        user={this.props.user}
        status={this.props.status}
        direction="horizontal"
        model={[
          {
            key: "1",
            text: "Home",
            to: "/",
            iconPath: "/images/home.svg"
          },
          {
            key: "2",
            text: "Products",
            to: "/products",
            iconPath: "/images/products.svg"
          },

          {
            key: "3",
            text: "Services",
            to: "/services",
            iconPath: "/images/services.svg"
          },

          {
            key: "4",
            text: "About Us",
            to: "/about",
            iconPath: "/images/about.svg"
          },

          {
            key: "5",
            text: "Contact Us",
            to: "/contact",
            iconPath: "/images/contact.svg"
          },

          {
            key: "6",
            text: "do what you want",
            to: "/products",
            iconPath: "/images/contact.svg"
          },
          {
            key: "7",
            text: "Rehman",
            to: "/products",
            iconPath: "/images/contact.svg"
          }
        ]}
      />
      </Fragment>
    );
  }
}

export default AppBar;
