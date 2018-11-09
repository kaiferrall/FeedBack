import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions

class Range extends Component {
  constructor() {
    super();
    this.state = {
      range: ""
    };
    this.getRange = this.getRange.bind(this);
  }

  getRange(e) {
    this.setState({ range: e.target.value });
  }

  render() {
    const { question, index, setResponse } = this.props;

    return (
      <div style={{ textAlign: "center" }} id="input-range" className="range">
        <p>
          {index + 1}. {question.text}
        </p>
        <hr />
        <input
          onChange={e => {
            this.getRange(e);
            setResponse(e, index);
          }}
          type="range"
          name="rng"
          min="0"
          max="10"
          className="custom-range"
          id="customRange1"
        />
        <p>{this.state.range}</p>
      </div>
    );
  }
}

export default Range;
