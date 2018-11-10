import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions

class TrueorFalse extends Component {
  constructor() {
    super();
    this.state = {
      buttonState: ""
    };
    this.buttonState = this.buttonState.bind(this);
  }
  buttonState(e) {
    this.setState({ buttonState: e.target.value });
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
          <button
            className={
              this.state.buttonState === "1" ? "t-f-btn-selected" : "t-f-btn"
            }
            onClick={e => {
              setResponse(e, index);
              this.buttonState(e);
            }}
            value={1}
          >
            true
          </button>
        </div>
        <div className="form-check form-check-inline">
          <button
            className={
              this.state.buttonState === "0" ? "t-f-btn-selected" : "t-f-btn"
            }
            onClick={e => {
              setResponse(e, index);
              this.buttonState(e);
            }}
            value={0}
          >
            false
          </button>
        </div>
      </div>
    );
  }
}

export default TrueorFalse;
