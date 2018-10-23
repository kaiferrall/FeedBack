import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

class LoginContainer extends Component {
  render() {
    return (
      <Router>
        <div id="login-container" className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
          </div>
          <div className="col-md-2" />
        </div>
      </Router>
    );
  }
}

export default LoginContainer;
