import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
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
      submitted: false,
      response: []
    };
    this.setResponse = this.setResponse.bind(this);
    this.submitResponse = this.submitResponse.bind(this);
  }

  componentDidMount() {
    const code = window.location.href.split("/").slice(4, 7);
    if (code[0].length === 4) {
      if (localStorage.FeedBack_response) {
        let submittedCode = jwt_decode(localStorage.FeedBack_response);
        if (submittedCode.code == code[0]) {
          this.setState({ submitted: true });
        }
      } else {
        this.props.enterCode({ code: code }, true);
      }
    } else {
      window.location.href = "/error/404";
    }
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
    if (this.state.submitted) {
      formContent = (
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "green" }}>Thank you for the response!</p>
        </div>
      );
    } else if (form.length > 0) {
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
            {this.state.submitted ? (
              ""
            ) : (
              <button
                style={{ borderRadius: "15px", margin: "25px 0 50px 0" }}
                className="btn btn-light"
                onClick={this.submitResponse}
              >
                Submit
              </button>
            )}
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
