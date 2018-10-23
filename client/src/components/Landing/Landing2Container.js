import React, { Component } from "react";

//Components
import EnterCode from "./EnterCode";
import Carousel from "./Carousel";

class Landing2Container extends Component {
  render() {
    return (
      <div id="landing-2-container" className="row">
        <div className="col-md-2" />
        <div id="how-it-works" className="col-md-8">
          <Carousel />
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
}

export default Landing2Container;
