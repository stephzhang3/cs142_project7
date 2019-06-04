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
      },
      mentions: []
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
          this.setState({ usersArray: val.data }, () => {
            this.props.changeMessage(this.state.usersArray.first_name);
            if (this.state.usersArray.mentions.length) {
              this.setState({
                mentions: []
              });
              this.state.usersArray.mentions.forEach(mention => {
                axios.get("/getPhoto/" + mention).then(
                  val => {
                    this.setState({
                      mentions: this.state.mentions.concat(val.data)
                    });
                  },
                  err => {
                    console.error("fetchModel error: ", err);
                  }
                );
              });
            } else {
              //console.log("im in the else statement");
              this.setState({ mentions: [] });
            }
          });
        },
        err => {
          console.error("fetchModel error: ", err);
        }
      );
    }
  }

  render() {
    console.log("USER DETAILS", this.state.usersArray);
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
          <ListItem>
            <ListItemText primary={"Mentions: "} />
            {this.state.mentions.length &&
              this.state.mentions.map(currMention => (
                <div key={currMention.file_name}>
                  <ListItemText primary={currMention.first_name} />
                  <img
                    src={"/images/".concat(currMention.file_name)}
                    alt={currMention.file_name}
                  />
                </div>
              ))}
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
