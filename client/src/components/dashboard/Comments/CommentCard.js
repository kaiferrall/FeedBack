import React, { Component } from "react";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

class CommentCard extends Component {
  constructor() {
    super();
    this.state = {
      sentiment: null
    };
  }

  componentDidMount() {
    var result = sentiment.analyze(this.props.comment);
    this.setState({ sentiment: result.score });
  }

  render() {
    let borderLeft;
    if (this.state.sentiment != null) {
      if (this.state.sentiment < 0) {
        borderLeft = "1px solid #f90909";
      } else {
        borderLeft = "1px solid #08cc2f";
      }
    }
    return (
      <div
        style={{
          borderLeft: borderLeft,
          paddingLeft: "15px"
        }}
      >
        <p>{this.props.comment}</p>
      </div>
    );
  }
}

export default CommentCard;
