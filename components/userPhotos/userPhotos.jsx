import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import "./userPhotos.css";
import React from "react";
//import fetchModel from "../../lib/fetchModelData";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhotos: [],
      comment: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(photo) {
    console.log("photo: ", photo);
    console.log("event: ", this.state.comment);
    axios
      .post("/commentsOfPhoto/" + photo._id, {
        comment: this.state.comment
      })
      .then(result => {
        //this.forceUpdate();
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
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
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
  }

  render() {
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
                  <TextField
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
                  />
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
