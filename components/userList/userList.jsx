import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import "./userList.css";
import { Link as RouterLink } from "react-router-dom";
//import fetchModel from "../../lib/fetchModelData";
import axios from "axios";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArray: []
    };
  }

  componentDidMount() {
    this.props.changeMessage("Home");
    axios.get("/user/list").then(
      val => {
        this.props.setUsers(val.data);
        this.setState({ usersArray: val.data });
      },
      err => {
        console.error("fetchModel error: ", err);
      }
    );
  }

  render() {
    return (
      <div>
        <Typography variant="title">List of Users</Typography>
        <List component="nav">
          {this.state.usersArray.map(currUser => {
            let link = "/users/" + currUser._id;
            return (
              <div key={currUser.first_name}>
                <ListItem button component={RouterLink} to={link}>
                  <ListItemText
                    primary={currUser.first_name.concat(
                      " ",
                      currUser.last_name
                    )}
                  />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default UserList;
