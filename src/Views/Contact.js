import React, { Component, Fragment } from "react";
import CSSGrid from "./CSSGrid";
import DynamicTable from "../Component/DynamicTable";
//import DynamicForm from "../DynamicForm";

//import "./App.css";

//import "bootstrap/dist/css/bootstrap.css";
//import "mqtt/dist/mqtt.js";

class Contact extends Component {
  constructor(props) {
    super(props);

    // TODO don't forget to add your app and js ids
  }

  render() {
    let schema = [];
    schema.push({
      Id: 0,
      propertyName: "first_name",
      propertyLabel: "Any Lable that you like First Name"
    });
    schema.push({
      Id: 1,
      propertyName: "last_name",
      propertyLabel: "Last Name"
    });
    schema.push({
      Id: 2,
      propertyName: "department",
      propertyLabel: "Department"
    });
    schema.push({
      Id: 2,
      propertyName: "position",
      propertyLabel: "Job Title"
    });

    return (
      <Fragment>
        <DynamicTable hasSchema="false" schema={schema}></DynamicTable>
        {console.log("Contact View")}
      </Fragment>
    );
  }
}

export default Contact;
