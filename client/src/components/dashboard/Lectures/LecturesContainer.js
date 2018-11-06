import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Components
import CourseListLoading from "../Courses/CourseListLoading";
import LectureCard from "./LectureCard";
import CreateLectureContainer from "./CreateLectureContainer";
//Functions
import { getAllLectures } from "../../../actions/lectureActions";

class CoursesContainer extends Component {
  constructor() {
    super();
    this.state = {
      courseId: ""
    };
  }
  componentDidMount() {
    const courseId = window.location.href.split("/")[5];
    this.props.getAllLectures(courseId);
    this.setState({ courseId: courseId });
  }

  render() {
    const { lectures, loading } = this.props;
    let lecturesList;
    if (lectures.length > 0) {
      lecturesList = lectures.map(lecture => (
        <LectureCard key={lecture._id} lecture={lecture} />
      ));
    } else if (lectures.length == 0 && !loading) {
      lecturesList = <p>No lectures yet</p>;
    }
    return (
      <div className="lectures-list">
        <a style={{ fontSize: "12px", color: "black" }} href="/dashboard">
          <i className="fas fa-chevron-right" />
          {"  "}dashboard
        </a>
        <CreateLectureContainer courseId={this.state.courseId} />
        {lecturesList}
      </div>
    );
  }
}

CoursesContainer.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
  //  lectures: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.status.user,
  errors: state.errors,
  loading: state.lectures.loading,
  lectures: state.lectures.lectures
});

export default connect(
  mapStateToProps,
  { getAllLectures }
)(CoursesContainer);
