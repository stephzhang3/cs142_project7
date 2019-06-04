import React from "react";
import "./userDetail.css";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
//import fetchModel from "../../lib/fetchModelData";
import Mentions from "./Mentions";
import axios from "axios";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj: {
        first_name: ""
      },
      mentions: []
    };
  }

  componentDidMount() {
    axios.get("/user/" + this.props.match.params.userId).then(
      val => {
        this.setState({ userObj: val.data }, () =>
          this.props.changeMessage(this.state.userObj.first_name)
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
          // if it gets the user, then it sets the user in the state
          this.setState({ userObj: val.data }, () => {
            this.props.changeMessage(this.state.userObj.first_name);
            //checks to see if the user has any mentions, if so sets the mentions photo object in the mentions array
            this.setState({
              mentions: []
            });
            if (this.state.userObj.mentions.length) {
              //loops through each photo id in the mentions array and populates the mentions array with the photo object
              this.state.userObj.mentions.forEach(mention => {
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
    console.log("USER DETAILS", this.state.userObj);
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText
              primary={this.state.userObj.first_name.concat(
                " ",
                this.state.userObj.last_name
              )}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Location: ".concat(this.state.userObj.location)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Description: ".concat(this.state.userObj.description)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Occupation: ".concat(this.state.userObj.occupation)}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={"Mentions: "} />
            <Mentions mentions={this.state.mentions} />
          </ListItem>
        </List>
        <Link
          variant="subheading"
          component={RouterLink}
          to={"/photos/".concat(this.state.userObj._id)}
        >
          Photos of {this.state.userObj.first_name}
        </Link>
      </div>
    );
  }
}

export default UserDetail;
