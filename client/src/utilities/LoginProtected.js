import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LoginProtected = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth == true ? <Redirect to="/dashboard" /> : <Component {...props} />
    }
  />
);

LoginProtected.propTypes = {
  auth: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  auth: state.status.authorization
});

export default connect(mapStateToProps)(LoginProtected);
