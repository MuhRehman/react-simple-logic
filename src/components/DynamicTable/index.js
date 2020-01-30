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
import Row from "./Row";

export default class DynamicTable extends React.Component {
  state = {
    order: "asc",
    orderrBy: "",
    selected: [],
    schema: [],
    page: 0,
    dense: true,
    rowsPerPage: 8
  };

  constructor(props) {
    super(props);
    this.rows = fakeData(); /// get your data
    this.hasSchema = this.props.hasSchema;
    this.schemaa = this.props.schema;
    this.rowCount = this.rows.length;

    if (this.props.hasSchema == "true") {
      console.log("Schema Provided");
      this.schemaa = this.props.schema;
      this.rows = this.addUid();
      //this.renderData(this.rows);
      //load the rows... schema is there.
    } else {
      console.log("Schema Not Provided");
      this.schemaa = this.calculateSchema(this.rows);
      this.rows = this.addUid();
      //this.renderData(this.rows);
    }
    //this.state.schema = this.props.schema;
  }

  addUid = () => {
    return this.rows.map((row, index) => {
      var newRow = Object.assign({}, row);
      newRow.DynamicTable_Uid = Object.values(row)[0] + "-" + index;
      return newRow;
    });
  };

  componentDidMount() {
    //this.setState({ hasHeader: this.props.hasHeader });
    //this.setState({ colNames: this.props.colNames });
    //this.renderData(this.state.rows);
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

    //this.schema = colNames;
    this.hasHeader = true;

    return schema;
  };

  renderData = () => {
    let printedRowss = [];
    let colNames = this.schemaa;
    let rowsToPrint = this.rows.slice(
      this.state.page * this.state.rowsPerPage,
      this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
    );

    //let rowID = this.state.page * this.state.rowsPerPage - 1;

    printedRowss = rowsToPrint.map(row => {
      //rowID = rowID + 1;
      return (
        <Row
          key={row["DynamicTable_Uid"]}
          rowId={row["DynamicTable_Uid"]}
          schema={colNames}
          row={row}
          onChange={this.handleDataChange}
        >
          {" "}
        </Row>
      );
    });
    console.log(printedRowss);
    return printedRowss;
  };

  handleDataChange = (strChange, rowId) => {
    console.log("do you want to " + strChange + " the record #" + rowId);

    let x = this.rows
      .map(row => {
        return row.DynamicTable_Uid;
      })
      .indexOf(rowId);

    console.log(x);

    this.rows.splice(x, 1); //Delete the element at position x
    this.setState({ rowCount: this.rows.length });
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
    this.rows = this.stableSort(
      this.rows,
      this.getSorting(this.state.order, property)
    );
    //this.renderData();
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
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  render() {
    const isSelected = id => this.state.selected.indexOf(id) !== -1;
    const emptyRows =
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.rows.length - this.state.page * this.state.rowsPerPage
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
                headCells={this.schemaa}
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderrBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.rows.length}
              />
              <TableBody>
                {this.renderData()}
                {
                  <TableRow style={{ height: 5 }}>
                    <TableCell colSpan={Object.keys(this.schemaa).length} />
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[8, 10, 25, 50, 300]}
            component="div"
            count={this.rows.length}
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
