import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";
import "./styles/main.css";

// import necessary components
import TopBar from "./components/topBar/TopBar";
import UserDetail from "./components/userDetail/UserDetail";
import UserList from "./components/userList/UserList";
import UserPhotos from "./components/userPhotos/UserPhotos";
import LoginRegister from "./components/loginRegister/LoginRegister";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      name: "",
      userIsLoggedIn: true
    };
    this.topBarChange = this.topBarChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
  }

  topBarChange(newMsg) {
    this.setState({ message: newMsg });
  }

  nameChange(newName) {
    this.setState({ name: newName });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar
                message={this.state.message}
                login={this.state.userIsLoggedIn}
              />
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList changeMessage={this.topBarChange} />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  {this.state.userIsLoggedIn ? (
                    <Route exact path="/" />
                  ) : (
                    <Redirect path="/users/:id" to="/login-register" />
                  )}
                  {this.state.userIsLoggedIn ? (
                    <Route
                      path="/users/:userId"
                      render={props => (
                        <UserDetail
                          {...props}
                          changeMessage={this.topBarChange}
                          changeName={this.nameChange}
                        />
                      )}
                    />
                  ) : (
                    <Redirect path="/users/:id" to="/login-register" />
                  )}
                  {this.state.userIsLoggedIn ? (
                    <Route
                      path="/photos/:userId"
                      render={props => (
                        <UserPhotos
                          {...props}
                          changeMessage={this.topBarChange}
                          name={this.state.message}
                        />
                      )}
                    />
                  ) : (
                    <Redirect path="/users/:id" to="/login-register" />
                  )}

                  <Route
                    path="/login-register"
                    render={props => <LoginRegister {...props} />}
                  />

                  {this.state.userIsLoggedIn ? (
                    <Route path="/users" component={UserList} />
                  ) : (
                    <Redirect path="/users/:id" to="/login-register" />
                  )}
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
