import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

//actions
import { enterCode } from "../../actions/studentActions";

class EnterCode extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.state.code.length != 8) {
      this.setState({ errors: { code: "Code must be 8 characters long" } });
    } else {
      this.props.enterCode({ code: this.state.code }, false);
    }
  }
  render() {
    const { errors } = this.state;
    let errorDisplay;
    if (errors.lecture) {
      errorDisplay = <p id="errorDisplay">{errors.lecture}</p>;
    }
    if (errors.code) {
      errorDisplay = <p id="errorDisplay">{errors.code}</p>;
    }
    return (
      <div className="enter-code">
        <div>
          <h6 id="welcome">Welcome</h6> to
          <h6 id="FEEDBACK">FeedBack</h6>
        </div>
        <div id="circle-1" />
        <div id="circle-2" />
        <div id="circle-3" />
        <div id="circle-4" />
        <form onSubmit={this.onSubmit} id="code-form">
          <input
            name="code"
            value={this.state.code}
            onChange={this.onChange}
            type="text"
            placeholder="Enter Code"
          />
          <button className="btn btn-light" type="submit">
            <i
              style={{ color: "#363993" }}
              className="fas fa-arrow-right fa-lg"
            />
          </button>
        </form>
        {errorDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { enterCode }
)(EnterCode);
