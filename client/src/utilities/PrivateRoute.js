import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    forceRefresh={false}
    render={props =>
      auth == true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  auth: state.status.authorization
});

export default connect(mapStateToProps)(PrivateRoute);
