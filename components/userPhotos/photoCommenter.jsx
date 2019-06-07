import React from "react";
import Button from "@material-ui/core/Button";
import { MentionsInput, Mention } from "react-mentions";
import axios from "axios";

class PhotoCommenter extends React.Component {
  //export default class PhotoCommenter {
  constructor(props) {
    super(props);

    this.state = { comment: "", mentions: [] }; //?
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mentionChange = this.mentionChange.bind(this);
  }

  handleSubmit(photo) {
    // console.log("photo: ", photo);
    // console.log("event: ", this.state.comment);
    axios
      .post("/commentsOfPhoto/" + photo._id, {
        comment: this.state.comment
      })
      .then(result => {
        console.log("comment done from server", result);
        this.setState({ comment: "" });
        axios.get("/photosOfUser/" + this.props.userId).then(
          val => {
            this.props.photoChange(val.data);
            this.props.getUsers();
            //this.setState({ userPhotos: val.data });
            //set mention here
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

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  mentionChange(event, newValue, newPlainText, mentions) {
    this.setState({ comment: event.target.value });
    this.setState({ mentions: mentions });
    console.log("mentions", mentions);
  }

  render() {
    return (
      <div>
        <MentionsInput
          value={this.state.comment}
          onChange={this.mentionChange}
          placeholder={"Mention people using '@'"}
        >
          <Mention
            trigger="@"
            data={this.props.users}
            // markup={"@__display__"}
          />
        </MentionsInput>
        <Button
          variant="contained"
          color="primary"
          label="Submit"
          type="submit"
          onClick={e => {
            e.persist();
            this.handleSubmit(this.props.photo, e);
          }}
        >
          Submit
        </Button>
      </div>
    );
  }
}
export default PhotoCommenter;
