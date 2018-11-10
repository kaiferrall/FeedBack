import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Components
//Functions
import { logoutUser } from "../actions/authActions";

class NavBar extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.logoutUser();
  }
  render() {
    const { auth, user } = this.props;

    let notLoggedIn = (
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="navbar-brand" href="/">
          <i className="fas fa-angle-double-right" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/login">
                Login <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Help <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
    let loggedIn = (
      <nav id="nav-loggedIn" className="navbar navbar-expand-lg navbar-light">
        <a id="nav-a-loggedin" className="navbar-brand" href="/dashboard">
          <i style={{ color: "#363993" }} className="fas fa-signal" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav-loggedin"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav-loggedin">
          <ul id="mobile-nav" className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/login">
                My Profile <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Settings <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active">
              <a onClick={this.onClick} className="nav-link" href="#">
                Sign out <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <ul id="dropdown-nav" className="navbar-nav">
            <li id="dropdown-content" className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/profile">
                  My Profile
                </a>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
                <div className="dropdown-divider" />
                <a onClick={this.onClick} className="dropdown-item" href="#">
                  Sign out
                </a>
              </div>
            </li>
          </ul>
          <form id="navbar-search" className="form-inline my-2 my-lg-0" />
        </div>
      </nav>
    );
    let NavBar = auth ? loggedIn : notLoggedIn;
    return <div>{NavBar}</div>;
  }
}

NavBar.propTypes = {
  auth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.status.authorization,
  user: state.status.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
