import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions

class MultipleChoice extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { question, index, setResponse } = this.props;
    let optionsDisplay;
    if (question.opts.length > 0) {
      optionsDisplay = question.opts.map((option, index) => {
        if (option.length > 0) {
          return (
            <option key={index} value={index}>
              {option}
            </option>
          );
        }
      });
    }
    return (
      <div className="multiple-choice">
        <p>
          {index + 1}. {question.text}
        </p>
        <hr />
        <select
          name="mc"
          onChange={e => {
            setResponse(e, index);
          }}
          className="form-control"
        >
          {optionsDisplay}
        </select>
      </div>
    );
  }
}

export default MultipleChoice;
