import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import axios from "axios";

class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login_name: "", password: "", user: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

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
          console.error("fetchModel error: ", err);
        }
      );
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        Login
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Login:
              <input
                type="text"
                name="login_name"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginRegister;
