import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(0)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

export default function CSSGrid() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Material-UI Grid:
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={2}>
          <Paper className={classes.paper}>Home</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Products</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Services</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>About Us</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Contact Us</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Login</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
