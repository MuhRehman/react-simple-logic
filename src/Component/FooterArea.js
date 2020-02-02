import React from "react";

import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <text>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Choroid.net
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </text>
  );
}

export default function FooterArea() {
  return (
    <div className="jumbotron text-center" style={{ marginBottom: 0 }}>
      <p>Footer</p>

      <Copyright />
    </div>
  );
}
