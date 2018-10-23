import React, { Component } from "react";

//Components

class EnterCode extends Component {
  render() {
    return (
      <div className="enter-code">
        <p>
          <p id="welcome">Welcome</p> to
          <p id="FEEDBACK">FeedBack</p>
        </p>
        <div id="circle-1" />
        <div id="circle-2" />
        <div id="circle-3" />
        <div id="circle-4" />
        <form id="code-form">
          <input type="text" placeholder="Enter Code" />
          <button className="btn btn-light" type="submit">
            <i
              style={{ color: "#363993" }}
              className="fas fa-arrow-right fa-lg"
            />
          </button>
        </form>
      </div>
    );
  }
}

export default EnterCode;
