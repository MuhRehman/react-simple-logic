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
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

import fakeData from "./jsonResponse";

export default class DynamicTable extends React.Component {
  state = {
    rows: [],
    rowsOnDisplay: [],
    order: "asc",
    orderrBy: "",
    selected: [],
    schema: [],
    page: 0,
    dense: true,
    rowsPerPage: 5
  };

  constructor(props) {
    super(props);
    this.rows = fakeData();
    this.hasSchema = this.props.hasSchema;
    this.schemaa = this.props.schema;
    //this.state.schema = this.props.schema;
    this.printedRows = [];
    this.printedRows.push(<TableRow></TableRow>);
  }

  componentDidMount() {
    //this.setState({ hasHeader: this.props.hasHeader });
    //this.setState({ colNames: this.props.colNames });
    if (this.hasSchema == "true") {
      console.log("Schema Provided");
      this.setState({ schema: this.props.schema });
      this.schemaa = this.props.schema;
      this.processData(this.rows);
      //load the rows... schema is there.
    } else {
      console.log("Schema Not Provided");
      //Calculate the schema and load the roads
      this.schemaa = this.calculateSchema(this.rows);
      this.processData(this.rows);
    }

    //this.processData(this.state.rows);
  }
  /* const classes = useStyles();
  const [, setOrder] = React.useState("asc");
  const [, setorderrBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [dataPrintedRows, setDataPrintedRows] = React.useState(headCells(rows));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  */

  desc = (a, b, orderrBy) => {
    if (a[orderrBy] === "" || a[orderrBy] === null || a[orderrBy] === undefined)
      return 1;
    if (b[orderrBy] === "" || b[orderrBy] === null || b[orderrBy] === undefined)
      return -1;

    if (b[orderrBy] < a[orderrBy]) {
      return -1;
    }
    if (b[orderrBy] > a[orderrBy]) {
      return 1;
    }

    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (order, orderrBy) => {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderrBy)
      : (a, b) => -this.desc(a, b, orderrBy);
  };

  calculateSchema = rows => {
    let keys = [];
    let keyCount = 0;

    rows.forEach(row => {
      for (var col in row) {
        if (keys.indexOf(col) == -1) keys.push(col);
      }
    });

    let schema = [];

    keys.forEach(key => {
      var obj = { propertyId: 0, propertyName: "", propertyLabel: "" };
      obj.propertyId = keyCount;
      obj.propertyName = key;
      obj.propertyLabel = key.charAt(0).toUpperCase() + key.slice(1);
      schema.push(obj);
      keyCount = keyCount + 1;
    });

    this.setState({ schema: schema });
    //this.schema = colNames;
    this.hasHeader = true;
    console.log(this.state.schema);
    console.log(schema);
    return schema;
  };

  processData = rows => {
    let printedRowss = [];
    let colNames = this.schemaa;
    // console.log(colNames);
    let rowID = 0;

    rows.forEach((row, index) => {
      let printedRow = [];

      colNames.forEach(col => {
        printedRow.push(
          <TableCell
            component="th"
            id={col.propertyId}
            scope="row"
            padding="none"
          >
            {row[col.propertyName]}
          </TableCell>
        );
      });

      printedRowss.push(
        <TableRow
          hover
          onClick={event => this.handleClick(event, index)}
          role="checkbox"
          aria-checked={this.state.isItemSelected}
          tabIndex={-1}
          id={index}
          selected={this.state.isItemSelected}
        >
          {" "}
          {printedRow}{" "}
        </TableRow>
      );

      rowID = rowID + 1;
    });

    this.printedRows = printedRowss;
    this.setState({
      rowCount: this.printedRows.length,
      rowsOnDisplay: this.printedRows.slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
      )
    });
    console.log(printedRowss);
  };

  handleRequestSort = (event, property) => {
    //const isDesc =
    // this.state.orderrBy === property && this.state.order === "desc";

    this.setState({ order: this.state.order === "desc" ? "asc" : "desc" });
    this.setState({ orderrBy: property });
    console.log(property);

    /* this.setState({
      rows: this.stableSort(
        this.state.rows,
        this.getSorting(this.state.order, this.state.orderrBy)
      )
    });
*/
    this.processData(
      this.stableSort(this.rows, this.getSorting(this.state.order, property))
    );
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map(n => n.id);
      this.setState({ selected: newSelecteds });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, name) => {
    console.log(name);
    console.log(event);
  }; /*
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
*/

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
    this.setState({
      rowsOnDisplay: this.printedRows.slice(
        newPage * this.state.rowsPerPage,
        newPage * this.state.rowsPerPage + this.state.rowsPerPage
      )
    });
  };

  //

  //

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });

    this.setState({
      rowsOnDisplay: this.printedRows.slice(0, parseInt(event.target.value, 10))
    });

    //const emptyRows =
    // this.state.rowsPerPage -
    // Math.min(
    //    this.state.rowsPerPage,
    //  this.printedRows.length - this.state.page * this.state.rowsPerPage
    //);
  };

  //isSelected = name =>  this.state.selected.indexOf(name) !== -1;

  //
  //headCells(rows);

  render() {
    const isSelected = id => this.state.selected.indexOf(id) !== -1;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.state.rows.length - this.state.page * this.state.rowsPerPage
      );

    return (
      <div //className={classes.root}
      >
        <Paper //className={classes.paper}
        >
          <EnhancedTableToolbar numSelected={this.state.selected.length} />
          <TableContainer>
            <Table
              stickyHeader
              //className={classes.table}
              aria-labelledby="tableTitle"
              size="small" // {dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                //classes={classes}
                headCells={this.state.schema}
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderrBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.state.rows.length}
              />
              <TableBody>
                {/*stableSort(rows, getSorting(order, orderrBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={labelId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      {printRow(row, labelId)}
                    </TableRow>
                  );
                })*/}

                {this.state.rowsOnDisplay}
                {
                  //helperPrintedRows(reload)
                }

                {
                  <TableRow style={{ height: 2 }}>
                    <TableCell colSpan={Object.keys(this.schemaa).length} />
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 300]}
            component="div"
            count={this.printedRows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}
