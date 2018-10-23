import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Actions
import { registerUser } from "../../actions/authActions";

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      name: "",
      password: "",
      password2: "",
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

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="signup-form-parent">
        <div id="login-circle-2" />
        <form onSubmit={this.onSubmit} className="login-form">
          <h1 id="signup-title">Sign Up</h1>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.username
            })}
            onChange={this.onChange}
            value={this.state.username}
            name="username"
            type="text"
            placeholder="Username"
          />
          <div className="invalid-feedback">{errors.username}</div>
          <br />
          <input
            className={classnames("form-control", {
              "is-invalid": errors.name
            })}
            onChange={this.onChange}
            value={this.state.name}
            name="name"
            type="text"
            placeholder="Name"
          />
          <div className="invalid-feedback">{errors.name}</div>
          <br />
          <input
            className={classnames("form-control", {
              "is-invalid": errors.password
            })}
            onChange={this.onChange}
            value={this.state.password}
            name="password"
            type="password"
            placeholder="Password (must contain numbers and letters)"
          />
          <div className="invalid-feedback">{errors.password}</div>
          <br />
          <input
            className={classnames("form-control", {
              "form-control-danger": errors.password2
            })}
            onChange={this.onChange}
            value={this.state.password2}
            name="password2"
            type="password"
            placeholder="Confirm Password"
          />
          <div className="invalid-feedback">{errors.password2}</div>
          <br />
          <button id="login-button" type="submit" className="btn btn-light">
            <i
              style={{ color: "#363993" }}
              className="fas fa-arrow-right fa-lg"
            />
          </button>
          <h6>Already have an account?</h6>
          <a href="/login" id="signup-link">
            Login here
          </a>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  registerUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignupForm));
