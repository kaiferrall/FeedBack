import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

//Components
import CoursesContainer from "./Courses/CoursesContainer";
import LecturesContainer from "./Lectures/LecturesContainer";
import LectureContainer from "./Lectures/LectureContainer";
import LectureForm from "./Lectures/Form/LectureForm";
import Page404 from "../Page404";

class DashboardContainer extends Component {
  componentWillMount() {
    let URL = window.location.href.split("/");
    if (
      URL.length > 4 &&
      (URL[4] != "lecture" && URL[4] != "course" && URL[4] != "form")
    ) {
      window.location.href = "/error/404";
    }
  }
  render() {
    return (
      <Router>
        <div className="dashboard-container">
          <div className="row">
            <div id="left-col" className="col-md-3">
              <CoursesContainer />
            </div>
            <div id="feed-column" className="col-md-6">
              <Switch>
                <Route
                  exact
                  path="/dashboard/course/:id"
                  component={LecturesContainer}
                />
                <Route
                  exact
                  path="/dashboard/lecture/:id"
                  component={LectureContainer}
                />
                <Route
                  exact
                  path="/dashboard/form/:id"
                  component={LectureForm}
                />
              </Switch>
            </div>
            <div className="col-md-3">
              <p>Recent Activity</p>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardContainer;
