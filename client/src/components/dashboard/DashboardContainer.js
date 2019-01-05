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
import CommentsContainer from "./Comments/CommentsContainer";
import LectureForm from "./Lectures/Form/LectureForm";
import Page404 from "../Page404";

const placeholder = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <small>Dashboad coming soon. Click into a course to get started.</small>
    </div>
  );
};

class DashboardContainer extends Component {
  componentWillMount() {
    let URL = window.location.href.split("/");
    if (
      URL.length > 4 &&
      (URL[4] != "lecture" &&
        URL[4] != "course" &&
        URL[4] != "form" &&
        URL[4] != "comments")
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
            <div id="feed-column" className="col-md-7">
              <Switch>
                <Route exact path="/dashboard" component={placeholder} />
                <Route
                  exact
                  path="/dashboard/course/:id"
                  component={LecturesContainer}
                />
                <Route
                  exact
                  component={LectureContainer}
                  path="/dashboard/lecture/:id"
                />
                <Route
                  exact
                  component={LectureContainer}
                  path="/dashboard/lecture/:id/data"
                />
                <Route
                  exact
                  path="/dashboard/form/:id"
                  component={LectureForm}
                />
                <Route
                  exact
                  path="/dashboard/comments/:id"
                  component={CommentsContainer}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardContainer;
