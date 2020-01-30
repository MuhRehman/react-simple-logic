import React, { Component, Fragment } from "react";
import CSSGrid from "./CSSGrid";
//import "./App.css";

//import "bootstrap/dist/css/bootstrap.css";
//import "mqtt/dist/mqtt.js";

class About extends Component {
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
        {" "}
        Company Policy 1) Our People: People are the biggest asset of the
        company i.e. all the permanent and contract based employees. Following
        are the pillars of people policy. A. Capacity Building: To strive for
        the capacity building and development of the people. B. Health & Safety:
        To ensure workplace safety and take care of health of the people. C.
        Equality: To provide equal opportunities regardless the gender, religion
        and caste of the people D. Compensation: To compensate people based on
        their skills, experience and behavior, regardless of the market trends,
        no matter if the company will have to lead the market in pay structure.
        2) Stakeholders and Customers: A. Quality Service: Not to just sell our
        products but to own our products even after sale and provide high
        quality services to all our customers setting new market trends and
        standards. B. Customer Feedback and C.I: To stay in touch with our
        customers and stakeholders for any possible feedback and incorporate
        those inputs in the continuous improvement cycles. C. Promote adoption
        of IoT: To be at the front line in promoting and encouraging the
        adoption of “internet of things” in Pakistan and abroad. D.
        Transparency: To remain transparent in all business transactions with
        customers, stakeholders, state and institutions. 3) Environment: A) Low
        Carbon Footprint: To keep a minimum carbon footprint while performing
        its business operations and where ever possible adopt green energy
        solutions. B) Human, Animals & Plants: Strictly ensures no harm to human
        beings and animals from the business operations of the company. If
        company operations compel removal of any plants or trees, company will
        ensure re-planting the same in double quantity. C) Social Responsibility
        and Community Development: 20% of the net annual income goes in the
        social and community development projects.
      </Fragment>
    );
  }
}

export default About;
