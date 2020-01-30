import React from "react";
import ReactDOM from "react-dom";
//import "./form.css";

import Radio from "@material-ui/core/Radio";
import withWidth from "@material-ui/core/withWidth";
import PropTypes from "prop-types";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  CardHeader,
  CardContent,
  Card,
  Button,
  Box,
  Typography,
  Select
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { typography } from "@material-ui/system";

class DynamicForm extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("gds:p:s", nextProps.defaultValues, prevState);

    let derivedState = {};

    if (
      nextProps.defaultValues &&
      nextProps.defaultValues.id !== prevState.id
    ) {
      //   Object.keys(prevState).forEach(k => {
      //     derivedState[k] = "";
      //   });
      return {
        ...nextProps.defaultValues
      };
    }

    console.log("no state change");
    return null;
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  onChange = (e, key, type = "single") => {
    //console.log(`${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      this.setState(
        {
          [key]: e.target.value
        },
        () => {}
      );
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      let found = this.state[key]
        ? this.state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = this.state[key].filter(d => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        console.log("found", key, this.state[key]);
        // this.setState({
        //   [key]: [e.target.value, ...this.state[key]]
        // });
        let others = this.state[key] ? [...this.state[key]] : [];
        this.setState({
          [key]: [e.target.value, ...others]
        });
      }
    }
  };

  renderForm = () => {
    let model = this.props.model;
    let defaultValues = this.props.defaultValues;

    let formUI = model.map(m => {
      let key = m.key;
      let type = m.type || "text";
      let props = m.props || {};
      let name = m.name;
      let value = m.value;

      let target = key;
      value = this.state[target] || "";

      let input;

      if (type == "text" || type == "number") {
        input = (
          <TextField
            inputProps={props}
            //className="form-input"
            style={{
              width: "100%",
              marginTop: "0px",
              marginBottom: "10px"
            }}
            type={type}
            placeholder={m.label}
            label={m.label}
            id={key}
            //label={name}
            value={value}
            variant="outlined"
            onChange={e => {
              this.onChange(e, target);
            }}
          />
        );

        return <div key={"g" + key}> {input} </div>;
      }

      if (type == "radio") {
        input = m.options.map(o => {
          let checked = o.value == value;

          return (
            <FormControlLabel
              inputProps={o.props}
              value={o.value}
              control={<Radio color="primary" />}
              label={o.value}
              labelPlacement="end"
            />
          );
        });

        return (
          <FormControl>
            <Typography>{m.label}</Typography>
            <RadioGroup
              aria-label="position"
              name="position"
              value={this.state[m.key]}
              onChange={e => {
                this.onChange(e, m.key);
              }}
              row
            >
              {input}
            </RadioGroup>
          </FormControl>
        );
      }

      if (type == "select") {
        input = m.options.map(o => {
          let checked = o.value == value;
          //console.log("select: ", o.value, value);
          return (
            <MenuItem
              props={o.props}
              //className="form-input"
              key={o.key}
              value={o.value}
            >
              {" "}
              {o.value}{" "}
            </MenuItem>
          );
        });

        //console.log("Select default: ", value);
        return (
          <FormControl style={{ width: "100%" }}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              {m.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state[m.key]}
              label={m.label}
              onChange={e => {
                this.onChange(e, m.key);
              }}
            >
              {input}
            </Select>
          </FormControl>
        );
      }

      if (type == "checkbox") {
        input = m.options.map(o => {
          //let checked = o.value == value;
          let checked = false;
          if (value && value.length > 0) {
            checked = value.indexOf(o.value) > -1 ? true : false;
          }
          //console.log("Checkbox: ", checked);
          return (
            <FormControlLabel
              key={o.key}
              name={o.name}
              primary
              control={
                <Checkbox
                  checked={checked}
                  style={{ color: "#3f51b5" }}
                  onChange={e => {
                    this.onChange(e, m.key, "multiple");
                  }}
                  value={o.value}
                />
              }
              label={o.label}
            />
          );
        });

        return (
          <FormControl style={{ width: "100%" }}>
            <Typography>{m.label} </Typography>
            <FormGroup row> {input}</FormGroup>
          </FormControl>
        );
      }
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <div
        className={this.props.className}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          padding: "1%",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: this.props.width == "xs" ? "100%" : "80%",
            height: "auto",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          {" "}
          <Card elevation={3}>
            <CardHeader title={title} style={{ background: "#e3e4e8" }} />
            <CardContent style={{ justifyContent: "space-around" }}>
              <form
                onSubmit={e => {
                  this.onSubmit(e);
                }}
              >
                {this.renderForm()}
                <div>
                  <Button
                    variant="outlined"
                    size="large"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    {" "}
                    Submit{" "}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

DynamicForm.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired
};

export default withWidth()(DynamicForm);
