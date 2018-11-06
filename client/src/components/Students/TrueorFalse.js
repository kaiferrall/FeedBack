import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions

class TrueorFalse extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { question, index, setResponse } = this.props;
    return (
      <div className="true-false">
        <p>
          {index + 1}. {question.text}
        </p>
        <hr />
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tf"
            onClick={e => {
              setResponse(e, index);
            }}
            id="inlineRadio1"
            value={1}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            true
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            onClick={e => {
              setResponse(e, index);
            }}
            name="tf"
            id="inlineRadio2"
            value={0}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            false
          </label>
        </div>
      </div>
    );
  }
}

export default TrueorFalse;
