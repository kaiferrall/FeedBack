import React, { Component } from "react";

//Components

class CommentCard extends Component {
  render() {
    return (
      <div style={{ borderLeft: "1px solid black", paddingLeft: "15px" }}>
        <p>{this.props.comment}</p>
      </div>
    );
  }
}

export default CommentCard;
