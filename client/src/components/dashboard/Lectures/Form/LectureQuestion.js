import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import MultipleChoice from "./MultipleChoice";

class LectureForm extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: []
    };
    this.suggestQuestion = this.suggestQuestion.bind(this);
  }

  suggestQuestion(e) {
    const currentInput = {
      text: e.target.value
    };
    axios.post("/api/forms/suggest", currentInput).then(res => {
      this.setState({ suggestions: res.data });
    });
  }

  render() {
    const { index, text, type, opts } = this.props;
    const { suggestions } = this.state;
    //suggestions
    let suggestionElement, mcOptions;

    if (type == "mc") {
      const j = 4 - opts.length;
      for (var i = 0; i < j; i++) {
        opts.push("");
      }
      mcOptions = opts.map((option, optionIndex) => (
        <MultipleChoice
          key={optionIndex}
          index={index}
          optionIndex={optionIndex}
          option={option}
          setOption={this.props.setOption}
        />
      ));
    }

    if (suggestions.length > 0) {
      suggestionElement = suggestions.map(question => {
        if (question.question.length > 40) {
          return (
            <button
              type="button"
              className="btn"
              key={question._id}
              onClick={this.props.setText}
              id="suggestion-a"
              name={index}
              value={question.question}
            >
              {question.question.slice(0, 42)} . . .
            </button>
          );
        } else {
          return (
            <button
              type="button"
              className="btn"
              key={question._id}
              onClick={this.props.setText}
              id="suggestion-a"
              name={index}
              value={question.question}
            >
              {question.question}
            </button>
          );
        }
      });
    } else {
      suggestionElement = "";
    }

    return (
      <div className="lecture-question">
        <form>
          <div className="form-group">
            <h5>{index + 1}.</h5>
            <div className="input-group mb-3">
              <input
                onChange={e => {
                  this.props.setText(e);
                  this.suggestQuestion(e);
                }}
                value={text}
                name={index}
                type="text"
                className="form-control"
                placeholder="Enter Question"
              />
              <div className="input-group-append">
                <button
                  name={index}
                  onClick={this.props.removeQuestion}
                  className="btn btn-danger"
                  type="button"
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div>{suggestionElement}</div>
            <div id="question-type" className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {type ? type : "Question Type"}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  onClick={this.props.selectType}
                  name={index}
                  value="mc"
                  className="dropdown-item"
                  type="button"
                >
                  multiple choice (mc)
                </button>
                <button
                  onClick={this.props.selectType}
                  name={index}
                  value="rng"
                  className="dropdown-item"
                  type="button"
                >
                  range (rng)
                </button>
                <button
                  onClick={this.props.selectType}
                  name={index}
                  value="tf"
                  className="dropdown-item"
                  type="button"
                >
                  true or false (tf)
                </button>
              </div>
            </div>
          </div>
        </form>
        <form>
          <div className="form-row">{mcOptions}</div>
        </form>
      </div>
    );
  }
}

export default LectureForm;
