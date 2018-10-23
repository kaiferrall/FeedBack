import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

//Actions
import { loginUser } from "../../actions/authActions";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="login-form-parent">
        <div id="login-circle" />
        <div id="login-circle-2" />
        <form onSubmit={this.onSubmit} className="login-form">
          <h1 id="signup-title">Welcome Back</h1>
          <input
            onChange={this.onChange}
            value={this.state.username}
            name="username"
            className={classnames("form-control", {
              "is-invalid": errors.username
            })}
            type="text"
            placeholder="Username"
          />
          <div className="invalid-feedback">{errors.username}</div>
          <br />
          <input
            name="password"
            onChange={this.onChange}
            value={this.state.password}
            className={classnames("form-control", {
              "is-invalid": errors.password
            })}
            type="password"
            placeholder="Password"
          />
          <div className="invalid-feedback">{errors.password}</div>
          <br />
          <button id="login-button" type="submit" className="btn btn-light">
            <i
              style={{ color: "#363993" }}
              className="fas fa-arrow-right fa-lg"
            />
          </button>
          <h6>New to FeedBack?</h6>
          <a href="/signup" id="signup-link">
            Sign up here
          </a>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);
