import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./TopBar.css";
import axios from "axios";
import Button from "@material-ui/core/Button";

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versionNumber: ""
    };
  }

  componentDidMount() {
    axios.get("test/info").then(
      val => {
        this.setState({ versionNumber: val.data.__v });
      },
      err => {
        console.error("fetchModel error: ", err);
      }
    );
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Stephanie Zhang
          </Typography>
          <Typography
            className="cs142-topbar-version-number"
            variant="subtitle2"
            color="inherit"
          >
            Version Number: {this.state.versionNumber}
          </Typography>
          <Typography
            //className="cs142-topbar-message"
            variant="h5"
            color="inherit"
          >
            {this.props.login ? "Hello first name" : ""}
          </Typography>
          {this.props.login ? (
            <Button variant="outlined" color="secondary">
              Log out
            </Button>
          ) : (
            ""
          )}
          <Typography
            className="cs142-topbar-message"
            variant="h5"
            color="inherit"
          >
            {this.props.message}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
