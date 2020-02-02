import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import FilterListIcon from "@material-ui/icons/FilterList";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { Button, Icon, TextField } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

export default class Row extends React.Component {
  state = {
    printedRow: {},
    isItemSelected: false,
    schema: [],
    isOpenForEdit: false,
    isOpenForDelete: false
  };

  constructor(props) {
    super(props);
    this.row = this.props.row;
    this.schema = this.props.schema;
    //this.state.schema = this.props.schema;
    this.state.printedRow = {};
  }

  helperRender = () => {
    let printedRow = [];
    let colNames = this.props.schema;

    if (this.state.isOpenForDelete) {
      return (
        <TableRow
          hover
          //onClick={event => this.handleClick(event, this.props.rowId)}
          role="checkbox"
          aria-checked={this.state.isItemSelected}
          tabIndex={-1}
          id={this.props.rowId}
          selected={this.state.isItemSelected}
        >
          <TableCell
            component="th"
            //id={col.propertyId}
            scope="row"
            padding="none"

            //onClick={event => this.handleClickCell(event, col.propertyId)}
          >
            <IconButton aria-label="delete" onClick={this.handleConfirmDelete}>
              <DoneOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="delete" onClick={this.handleCancelDelete}>
              <CloseOutlinedIcon fontSize="small" />
            </IconButton>
          </TableCell>
          <TableCell colSpan={colNames.length}>
            <Typography>
              {" "}
              Are you sure You want to delete this item ?{" "}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    colNames.forEach(col => {
      if (this.state.isOpenForEdit == true) {
        printedRow.push(
          <TableCell
            component="th"
            id={col.propertyId}
            scope="row"
            padding="none"
            // onClick={event => this.handleClickCell(event, col.propertyId)}
          >
            <TextField
              placeholder={col.propertyName}
              label={col.propertyName}
              id={col.propertyId}
              defaultValue={this.props.row[col.propertyName]}
              onChange={e => {
                this.handleTextChange(e, col.propertyName);
              }}
              //value={this.row[col.propertyName]}
            ></TextField>
          </TableCell>
        );
      } else {
        printedRow.push(
          <TableCell
            component="th"
            id={col.propertyId}
            scope="row"
            padding="none"
            //onClick={event => this.handleClickCell(event, col.propertyId)}
          >
            {this.props.row[col.propertyName]}
          </TableCell>
        );
      }
    });

    if (this.state.isOpenForEdit) {
      return (
        <TableRow
          hover
          //onClick={event => this.handleClick(event, this.props.rowId)}
          role="checkbox"
          aria-checked={this.state.isItemSelected}
          tabIndex={-1}
          id={this.props.rowId}
          selected={this.state.isItemSelected}
        >
          <TableCell
            component="th"
            //id={col.propertyId}
            scope="row"
            padding="none"
            //onClick={event => this.handleClickCell(event, col.propertyId)}
          >
            <IconButton aria-label="delete" onClick={this.handleConfirmEdit}>
              <DoneOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="delete" onClick={this.handleCancelEdit}>
              <CloseOutlinedIcon fontSize="small" />
            </IconButton>
          </TableCell>
          {printedRow}{" "}
        </TableRow>
      );
    }

    return (
      <TableRow
        hover
        //onClick={event => this.handleClick(event, this.props.rowId)}
        role="checkbox"
        aria-checked={this.state.isItemSelected}
        tabIndex={-1}
        id={this.props.rowId}
        selected={this.state.isItemSelected}
      >
        <TableCell
          component="th"
          //id={col.propertyId}
          scope="row"
          padding="none"
          //onClick={event => this.handleClickCell(event, col.propertyId)}
        >
          <IconButton aria-label="delete" onClick={this.handleEdit}>
            <CreateIcon fontSize="small" />
          </IconButton>

          <IconButton aria-label="delete" onClick={this.handleDelete}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
        {printedRow}{" "}
      </TableRow>
    );
  };

  handleTextChange = (event, target) => {
    this.row[target] = event.target.value;
    console.log(this.row[target]);
    //console.log("Delete Confirmation Row ID :" + this.props.rowId);
    // this.setState({ isOpenForDelete: false });
    // this.props.onChange("delete", this.props.rowId);

    //this.setState({ isItemSelected: true });
  };

  handleConfirmDelete = (event, rowID) => {
    console.log("Delete Confirmation Row ID :" + this.props.rowId);
    this.setState({ isOpenForDelete: false });
    this.props.onChange("delete", this.props.rowId);

    //this.setState({ isItemSelected: true });
  };

  handleCancelDelete = (event, rowID) => {
    console.log("Delete Cancelled  :" + this.props.rowId);
    this.setState({ isOpenForDelete: false });

    //this.setState({ isItemSelected: true });
  };

  handleConfirmEdit = (event, rowID) => {
    console.log("Edit Confirmation Row ID :" + this.props.rowId);

    this.setState({ isOpenForEdit: false });
    //this.props.onChange("edit", this.props.rowId);

    //this.setState({ isItemSelected: true });
  };

  handleCancelEdit = (event, rowID) => {
    console.log("Edit Cancelled:" + this.props.rowId);
    this.setState({ isOpenForEdit: false });

    //this.setState({ isItemSelected: true });
  };

  handleEdit = (event, rowID) => {
    this.setState({
      isOpenForEdit: true
    });
  };

  handleDelete = (event, rowID) => {
    this.setState({ isOpenForDelete: true });
  };

  render() {
    return this.helperRender();
  }
}
