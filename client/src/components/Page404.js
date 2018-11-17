import React, { Component } from "react";
import { connect } from "react-redux";

const Page404 = props => (
  <div id="not-found-container" className="row">
    <div className="col-md-4" />
    <div className="col-md-4">
      <p>404</p>
      <p>Sorry! Page not found</p>
      {props.auth ? (
        <a href="/dashboard">back to my dashboard</a>
      ) : (
        <a href="/">back to the home page</a>
      )}
      <div className="circle-404" />
    </div>
    <div className="col-md-4" />
  </div>
);

const mapStateToProps = state => ({
  auth: state.status.authorization
});
export default connect(mapStateToProps)(Page404);
