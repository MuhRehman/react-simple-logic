import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Choroid.net
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "#f9f9f9"
    //theme.palette.type === "dark"
    //? theme.palette.grey[800]
    // : theme.palette.grey[200]
  }
}));

export default function FooterArea() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            Choroid Solutions Private Limited
          </Typography>

          <img
            src={"./images/footer.png"}
            style={{
              width: "100%",
              height: "100%"
            }}
            alt={"Footer Area"}
          />

          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
