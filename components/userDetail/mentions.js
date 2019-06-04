import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
//import fetchModel from "../../lib/fetchModelData";
// import axios from "axios";

// props = {
//   mentions: []
// }

export default function Mentions(props) {
  const { mentions } = props;
  return (
    mentions.length &&
    mentions.map(currMention => (
      <div key={currMention.file_name}>
        <ListItemText primary={currMention.first_name} />
        <img
          src={"/images/" + currMention.file_name}
          alt={currMention.file_name}
          style={{
            height: "auto",
            width: "100px",
            display: "inline-block"
          }}
        />
      </div>
    ))
  );
}
