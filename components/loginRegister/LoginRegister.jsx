import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import axios from "axios";

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versionNumber: ""
    };
  }

  componentDidMount() {}

  render() {
    return <div> not logged in </div>;
  }
}

export default LoginRegister;
