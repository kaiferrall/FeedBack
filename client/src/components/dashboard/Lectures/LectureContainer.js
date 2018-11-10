import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Actions
import { getLecture } from "../../../actions/lectureActions";
//Components
import LectureHeader from "./LectureHeader";
import LectureData from "./LectureData";

class LectureContainer extends Component {
  constructor() {
    super();
    this.state = {
      lecturedId: ""
    };
  }

  componentDidMount() {
    const lectureId = window.location.href.split("/")[5];
    this.props.getLecture(lectureId);
    this.setState({ lecturedId: lectureId });
  }

  render() {
    let addForm;
    const { lecture } = this.props;
    const backCourse = `/dashboard/course/${lecture.course}`;
    const formURL = `/dashboard/lecture/form/${this.state.lectureId}`;

    return (
      <Router>
        <div>
          <a style={{ fontSize: "12px", color: "black" }} href="/dashboard">
            <i className="fas fa-chevron-right" />
            {"  "}dashboard
          </a>
          {"    "}
          <a style={{ fontSize: "12px", color: "black" }} href={backCourse}>
            <i className="fas fa-chevron-right" />
            {"  "}course
          </a>
          {"    "}
          <a
            style={{ fontSize: "12px", color: "black" }}
            href={window.location.href}
          >
            <i className="fas fa-chevron-right" />
            {"  "}
            {lecture.name}
          </a>
          <div className="lecture-header">
            <LectureHeader
              id={lecture._id}
              status={lecture.status}
              name={lecture.name}
              date={lecture.date}
              notes={lecture.notes}
              code={lecture.code}
              form={lecture.form}
            />
          </div>
          <div className="lecture-data">
            <h4>Lecture Data</h4>
            <hr />
            <LectureData lecture={lecture} />
          </div>
        </div>
      </Router>
    );
  }
}

LectureContainer.propTypes = {
  lecture: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lecture: state.lectures.lecture
});

export default connect(
  mapStateToProps,
  { getLecture }
)(LectureContainer);
