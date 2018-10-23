import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import CoursesContainer from "./Courses/CoursesContainer";
import LecturesContainer from "./Lectures/LecturesContainer";
import LectureContainer from "./Lectures/LectureContainer";
import LectureForm from "./Lectures/Form/LectureForm";

class DashboardContainer extends Component {
  render() {
    return (
      <Router>
        <div className="dashboard-container">
          <div className="row">
            <div className="col-md-3">
              <CoursesContainer />
            </div>
            <div id="feed-column" className="col-md-6">
              <Route path="/dashboard/course" component={LecturesContainer} />
              <Route path="/dashboard/lecture" component={LectureContainer} />
              <Route path="/dashboard/form" component={LectureForm} />
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardContainer;
