import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./LoginRegister.css";

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_name: "",
      password: "",
      user: {},
      incorrectLogin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleNewUser(event) {}

  handleSubmit(event) {
    console.log("A name was submitted: ", this.state);
    event.preventDefault();
    axios
      .post("/admin/login", {
        login_name: this.state.login_name,
        password: this.state.password
      })
      .then(
        val => {
          console.log("loginregister", val);
          this.props.changeUser(val.data);
          this.props.changeLogIn(true);
        },
        err => {
          this.setState({ incorrectLogin: true });
          console.error("fetchModel error: ", err);
        }
      );
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <Typography component="h1" variant="h5">
            Log In:
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                className="text"
                type="login name"
                name="login_name"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Login Name"
              />
              <TextField
                type="password"
                className="text"
                name="password"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Password"
              />
              <Button
                variant="contained"
                color="secondary"
                label="Submit"
                type="submit"
              >
                Submit
              </Button>
            </div>
            <Typography variant="subtitle2" color="inherit">
              {this.state.incorrectLogin &&
                "Incorrect login or password. Please try again"}
            </Typography>
          </form>
        </div>
        <div>
          <Typography component="h1" variant="h5">
            Create New User:
          </Typography>
          <form onSubmit={this.handleNewUser}>
            <div>
              <TextField
                type="text"
                name="login_name"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Login Name"
              />
              <TextField
                type="password"
                name="password"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Password"
              />
              <TextField
                type="password"
                name="password2"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Retype Password"
              />
              <TextField
                type="text"
                name="first_name"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="First Name"
              />
              <TextField
                type="text"
                name="last_name"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Last Name"
              />
              <TextField
                type="text"
                name="location"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Location"
              />
              <TextField
                type="text"
                name="description"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Description"
              />
              <TextField
                type="text"
                name="occupation"
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                label="Occupation"
              />
              <Button
                variant="contained"
                color="secondary"
                label="Submit"
                type="submit"
              >
                Register Me
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginRegister;
