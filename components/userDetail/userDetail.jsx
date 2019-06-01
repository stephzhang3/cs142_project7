import React from "react";
import "./userDetail.css";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
//import fetchModel from "../../lib/fetchModelData";
import axios from "axios";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersArray: {
        first_name: ""
      }
    };
  }

  componentDidMount() {
    axios.get("/user/" + this.props.match.params.userId).then(
      val => {
        this.setState({ usersArray: val.data }, () =>
          this.props.changeMessage(this.state.usersArray.first_name)
        );
      },
      err => {
        console.error("fetchModel error: ", err);
      }
    );
  }

  componentDidUpdate(prevProps) {
    //check if userID changed
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      axios.get("/user/" + this.props.match.params.userId).then(
        val => {
          this.setState({ usersArray: val.data }, () =>
            this.props.changeMessage(this.state.usersArray.first_name)
          );
        },
        err => {
          console.error("fetchModel error: ", err);
        }
      );
    }
  }

  render() {
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText
              primary={this.state.usersArray.first_name.concat(
                " ",
                this.state.usersArray.last_name
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Location: ".concat(this.state.usersArray.location)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Description: ".concat(
                this.state.usersArray.description
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Occupation: ".concat(this.state.usersArray.occupation)}
            />
          </ListItem>
        </List>
        <Link
          variant="subheading"
          component={RouterLink}
          to={"/photos/".concat(this.state.usersArray._id)}
        >
          Photos of {this.state.usersArray.first_name}
        </Link>
      </div>
    );
  }
}

export default UserDetail;
