import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Components
import CourseCard from "./CourseCard";
import CourseListLoading from "./CourseListLoading";
import CreateCourseModal from "./CreateCourseModal";
//Functions
import { getAllCourses } from "../../../actions/coursesActions";

class CoursesContainer extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAllCourses(this.props.user.id);
  }

  render() {
    const { loading, user, errors, courses } = this.props;
    let courseList;
    //Check for no courses
    if (loading) {
      courseList = <CourseListLoading />;
    } else if (courses.length > 0) {
      courseList = courses.map(course => (
        <div key={course._id}>
          <CourseCard course={course} />
        </div>
      ));
    } else {
      courseList = <p>No Courses</p>;
    }

    return (
      <div className="courses-container">
        <h5 id="course-list-title">My Courses</h5>
        <hr />
        <a
          id="make-new-course"
          data-toggle="modal"
          data-target="#exampleModal"
          href="#"
        >
          <i className="fas fa-plus" /> New Course
        </a>
        <CreateCourseModal />
        <div id="course-list-container">{courseList}</div>
      </div>
    );
  }
}

CoursesContainer.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.status.user,
  errors: state.errors,
  courses: state.courses.courses,
  loading: state.courses.loading
});

export default connect(
  mapStateToProps,
  { getAllCourses }
)(CoursesContainer);
