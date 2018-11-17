import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import CourseCard from "./CourseCard";
import CourseListLoading from "./CourseListLoading";
import CreateCourseModal from "./CreateCourseModal";
//Functions
import { getAllCourses } from "../../../actions/coursesActions";
import compareCoursesProps from "../../../utilities/compareCoursesProps";

class CoursesContainer extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      loading: false
    };
  }
  componentDidMount() {
    this.props.getAllCourses();
  }

  render() {
    const { loading, courses } = this.props;
    let courseList;

    if (loading) {
      courseList = <CourseListLoading />;
    } else if (!loading && courses.length === 0) {
      courseList = <p>Create a course to get started</p>;
    } else {
      courseList = courses.map(course => (
        <div key={course._id}>
          <CourseCard course={course} />
        </div>
      ));
    }

    return (
      <div className="courses-container">
        <h3 id="course-list-title">My Courses</h3>
        <hr />
        <a
          id="make-new-course"
          data-toggle="modal"
          data-target="#exampleModal"
          href="#"
          style={{ color: "#0050EF" }}
        >
          <i className="fas fa-plus" /> New Course
        </a>
        <CreateCourseModal />
        <div id="course-list-container">{courseList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  loading: state.courses.loading
});

export default connect(
  mapStateToProps,
  { getAllCourses }
)(CoursesContainer);
