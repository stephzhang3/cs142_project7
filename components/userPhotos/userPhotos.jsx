import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import "./userPhotos.css";
import React from "react";
//import fetchModel from "../../lib/fetchModelData";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MentionsInput, Mention } from "react-mentions";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhotos: [],
      comment: "",
      users: [],
      mentions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mentionChange = this.mentionChange.bind(this);
    //this.setUserData = this.setUserData();
  }

  handleSubmit(photo) {
    console.log("photo: ", photo);
    console.log("event: ", this.state.comment);
    axios
      .post("/commentsOfPhoto/" + photo._id, {
        comment: this.state.comment
      })
      .then(result => {
        console.log("comment done from server", result);
        this.setState({ comment: "" });
        axios.get("/photosOfUser/" + this.props.match.params.userId).then(
          val => {
            this.setState({ userPhotos: val.data });
          },
          err => {
            console.error("fetchModel error: ", err);
          }
        );
      });
    if (this.state.mentions.length) {
      this.state.mentions.forEach(function(mention) {
        axios
          .post("/mentionsOfPhoto/" + photo._id, {
            mentionUser: mention.id
          })
          .then(result => console.log(result))
          .catch(err => console.log(err));
      });
    }
  }

  // setUserData(users) {
  //   let currUsers = [];
  //   for (user in users) {
  //     let id = user._id;
  //     let display = user.first_name + " " + user.last_name;
  //     let currUser = { id: id, display: display };
  //     currUsers.push(currUser);
  //   }
  //   console.log(currUsers);
  //   this.setState({ users: currUsers });
  // }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  mentionChange(event, newValue, newPlainText, mentions) {
    this.setState({ comment: event.target.value });
    this.setState({ mentions: mentions });
    console.log("mentions", mentions);
  }

  componentDidMount() {
    this.props.changeMessage("Photos of " + this.props.name);
    axios.get("/photosOfUser/" + this.props.match.params.userId).then(
      val => {
        this.setState({ userPhotos: val.data });
      },
      err => {
        console.error("fetchModel error: ", err);
      }
    );
    let currUsers = [];
    this.props.users.forEach(function(user) {
      let id = user._id;
      let display = user.first_name + " " + user.last_name;
      let currUser = { id: id, display: display };
      currUsers.push(currUser);
    });
    this.setState({ users: currUsers });
  }

  render() {
    //console.log("photos", this.props.users);
    return (
      <div>
        {this.state.userPhotos.map(photo => (
          <div className="photos" key={photo._id}>
            <Typography variant="title">Photo on {photo.date_time}</Typography>
            <img src={"/images/".concat(photo.file_name)} alt={photo._id} />
            {photo.comments && (
              <div>
                <Typography variant="subheading">Comments:</Typography>
                <List>
                  {photo.comments.map(comment => {
                    return (
                      <div key={comment._id}>
                        <Link
                          variant="subheading"
                          component={RouterLink}
                          to={"/users/" + comment.user._id}
                        >
                          {comment.user.first_name}
                        </Link>
                        <ListItem>
                          <ListItemText primary={comment.date_time} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary={comment.comment} />
                        </ListItem>
                      </div>
                    );
                  })}
                  {/* <TextField
                    id="outlined-multiline-flexible"
                    label="New Comment"
                    multiline
                    rowsMax="4"
                    value={this.state.comment}
                    onChange={e => {
                      e.persist();
                      this.handleChange(e);
                    }}
                    margin="normal"
                    variant="outlined"
                  /> */}
                  <MentionsInput
                    value={this.state.comment}
                    onChange={this.mentionChange}
                    placeholder={"Mention people using '@'"}
                  >
                    <Mention trigger="@" data={this.state.users} />
                  </MentionsInput>
                  <Button
                    variant="contained"
                    color="primary"
                    label="Submit"
                    type="submit"
                    onClick={e => {
                      e.persist();
                      this.handleSubmit(photo, e);
                    }}
                  >
                    Submit
                  </Button>
                </List>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default UserPhotos;
