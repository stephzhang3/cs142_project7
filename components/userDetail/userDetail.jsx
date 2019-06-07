import React from "react";
import "./userDetail.css";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
//import fetchModel from "../../lib/fetchModelData";
import Mentions from "./Mentions";
import axios from "axios";
import { HashLink } from "react-router-hash-link";

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
      mentions: [],
      topPhoto: {},
      topComment: {}
    };
  }

  userChange(newUser) {
    this.setState({ userObj: newUser });
  }

  getTopPhoto() {
    axios.get("/getTopUserPhoto/" + this.props.userId).then(
      photo => {
        this.setState({ topPhoto: photo.data });
        console.log(this.state.topPhoto);
      },
      err => {
        console.error("fetchModel error: ", err);
      }
    );
  }

  getTopComment() {
    this.setState({
      topComment: {}
    });
    axios.get("/getTopComment/" + this.props.userId).then(
      photo => {
        console.log("top comment", photo);
        this.setState({ topComment: photo.data });
      },
      err => {
        console.error("fetchModel error: ", err);
      }
    );
  }

  getUserDetail() {
    axios.get("/user/" + this.props.userId).then(
      val => {
        // if it gets the user, then it sets the user in the state
        console.log("user:", val);
        this.setState({ userObj: val.data }, () => {
          this.props.changeMessage(this.state.userObj.first_name);
          //checks to see if the user has any mentions, if so sets the mentions photo object in the mentions array
          this.setState({
            mentions: []
          });
          if (this.state.userObj.mentions.length) {
            //loops through each photo id in the mentions array and populates the mentions array with the photo object
            console.log("in mentions if statement");
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

  componentDidMount() {
    console.log("component mounted");
    this.getUserDetail();
    this.getTopPhoto();
    this.getTopComment();
  }

  componentDidUpdate(prevProps) {
    //check if userID changed
    if (this.props.userId !== prevProps.userId) {
      this.getUserDetail();
      this.getTopPhoto();
      this.getTopComment();
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
          {Object.keys(this.state.topPhoto).length ? (
            <ListItem>
              <ListItemText
                primary={
                  "Most Recent Photo on " + this.state.topPhoto.date_time
                }
              />
              <HashLink to={"/photos/" + this.state.userObj._id}>
                <img
                  src={"/images/" + this.state.topPhoto.file_name}
                  alt={this.state.topPhoto.file_name}
                  style={{
                    height: "auto",
                    width: "100px",
                    display: "block",
                    margin: "10px"
                  }}
                />
              </HashLink>
            </ListItem>
          ) : (
            <ListItem>
              <ListItemText primary={"No most recent photo"} />
            </ListItem>
          )}
          {Object.keys(this.state.topComment).length ? (
            <ListItem>
              <ListItemText
                primary={
                  Object.keys(this.state.topComment).length
                    ? "Photo with most comments: " +
                      this.state.topComment.comments.length +
                      " comment(s)"
                    : "No photo with most comments"
                }
              />
              <HashLink to={"/photos/" + this.state.userObj._id}>
                <img
                  src={"/images/" + this.state.topComment.file_name}
                  alt={this.state.topPhoto.file_name}
                  style={{
                    height: "auto",
                    width: "100px",
                    display: "block",
                    margin: "10px"
                  }}
                />
              </HashLink>
            </ListItem>
          ) : (
            <ListItem>
              {" "}
              <ListItemText primary="No photo with most comments" />
            </ListItem>
          )}
          <ListItem>
            <Link
              variant="subheading"
              component={RouterLink}
              to={"/photos/" + this.state.userObj._id}
            >
              Photos of {this.state.userObj.first_name}
            </Link>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default UserDetail;
