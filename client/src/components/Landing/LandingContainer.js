import React, { Component } from "react";

//Components
import EnterCode from "./EnterCode";
import Landing2Container from "./Landing2Container";

class LandingContainer extends Component {
  render() {
    return (
      <div>
        <div id="landing-container" className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <EnterCode />
          </div>
          <div className="col-md-2" />
        </div>
        <Landing2Container />
      </div>
    );
  }
}

export default LandingContainer;
