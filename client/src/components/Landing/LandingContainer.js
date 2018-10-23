import React, { Component } from "react";

//Components
import EnterCode from "./EnterCode";

class LandingContainer extends Component {
  render() {
    return (
      <div id="landing-container" className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <EnterCode />
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
}

export default LandingContainer;
