import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import "./userPhotos.css";
import React from "react";
//import fetchModel from "../../lib/fetchModelData";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import axios from "axios";

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPhotos: []
    };
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
                  {photo.comments.map(comment => (
                    <div key={comment._id}>
                      <Link
                        variant="subheading"
                        component={RouterLink}
                        to={"/users/".concat(comment.user._id)}
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
                  ))}
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
