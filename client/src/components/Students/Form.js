import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Actions
import { enterCode, submitResponse } from "../../actions/studentActions";
//Question Components
import Range from "./Range";
import MultipleChoice from "./MultipleChoice";
import TrueorFalse from "./TrueorFalse";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      response: []
    };
    this.setResponse = this.setResponse.bind(this);
    this.submitResponse = this.submitResponse.bind(this);
  }

  componentDidMount() {
    const code = window.location.href.split("/").slice(4, 11);
    const courseCode = {
      code: code
    };
    this.props.enterCode(courseCode, true);
  }

  submitResponse() {
    const code = window.location.href.split("/").slice(4, 11);
    const { response } = this.state;

    this.props.submitResponse(code, { response: response });
  }

  setResponse(e, index) {
    const newReponse = this.state.response;
    newReponse[index] = { response: e.target.value, type: e.target.name };
    this.setState({ response: newReponse });
  }

  render() {
    const { form } = this.props;
    let formContent;
    if (form.length > 0) {
      formContent = form.map((question, index) => {
        if (question.type === "mc") {
          return (
            <MultipleChoice
              key={index}
              index={index}
              question={question}
              setResponse={this.setResponse}
            />
          );
        } else if (question.type === "rng") {
          return (
            <Range
              key={index}
              index={index}
              question={question}
              setResponse={this.setResponse}
            />
          );
        } else if (question.type === "tf") {
          return (
            <TrueorFalse
              key={index}
              index={index}
              question={question}
              setResponse={this.setResponse}
            />
          );
        }
      });
    }
    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="form-container">
            {formContent}
            <button
              style={{ borderRadius: "15px", marginTop: "25px" }}
              className="btn btn-light"
              onClick={this.submitResponse}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: state.students.form
});
export default connect(
  mapStateToProps,
  { enterCode, submitResponse }
)(Form);
