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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

export default function EnhancedTableHead(props) {
  const headCells = props.headCells;

  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  function helperRender() {
    if (headCells == undefined || headCells == null) return null;
    else
      return headCells.map(headCell => (
        <TableCell
          //key={headCell.propertyId}
          align="left"
          padding="none"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            backgroundColor: "#f9f9f9"
          }}
          sortDirection={orderBy === headCell.propertyName ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.propertyName}
            direction={order}
            onClick={createSortHandler(headCell.propertyName)}
          >
            {headCell.propertyLabel}
            {orderBy === headCell ? (
              <span
                style={{
                  border: 0,
                  clip: "rect(0 0 0 0)",
                  height: 1,
                  margin: -1,
                  overflow: "hidden",
                  padding: 0,
                  position: "absolute",
                  top: 20,
                  width: 1
                }}
              >
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ));
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="left"
          padding="none"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            backgroundColor: "#f9f9f9"
          }}
        >
          {" "}
          Actions{" "}
        </TableCell>

        {helperRender()}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  //classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};
