import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions

class Range extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { question, index } = this.props;

    return (
      <div className="range">
        <p>
          {index + 1}. {question.text}
        </p>
        <hr />
        <input type="range" className="custom-range" id="customRange1" />
      </div>
    );
  }
}

export default Range;
