import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Actions
import { getLecture } from "../../../actions/lectureActions";
//Components
import LectureHeader from "./LectureHeader";
import LectureData from "./LectureData";
import DeleteLecture from "./DeleteLecture";

class LectureContainer extends Component {
  constructor() {
    super();
    this.state = {
      lecturedId: ""
    };
    this.reloadData = this.reloadData.bind(this);
  }

  componentDidMount() {
    const resource = window.location.href.split("/")[5];
    if (resource.length < 24) {
      window.location.href = "/error/404";
    } else {
      const lectureId = resource.slice(0, 24);
      this.props.getLecture(lectureId);
      this.setState({ lecturedId: lectureId });
    }
  }

  reloadData() {
    this.props.getLecture(this.props.lecture._id);
  }

  render() {
    let addForm, refreshBtn;
    const { lecture } = this.props;
    const backCourse = `/dashboard/course/${lecture.course}`;
    const settingsLink = `/dashboard/settings/lecture/${lecture._id}`;
    const formURL = `/dashboard/lecture/form/${this.state.lectureId}`;

    if (lecture.status) {
      if (lecture.status.iat < Date.now() && lecture.status.exp > Date.now()) {
        refreshBtn = (
          <a onClick={this.reloadData} href="javascript:void(0)">
            <i className="fas fa-redo-alt" />
            {"   "}Refresh Data
          </a>
        );
      }
    }

    return (
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
          <div className="lecture-data-header">
            <h4>Lecture Data</h4>
            <a id="lecture-settings" href={settingsLink}>
              <i className="fas fa-wrench" />
              {"      "}Settings
            </a>
          </div>
          <hr />
          {refreshBtn}
          <LectureData form={lecture.form} id={lecture._id} />
          <hr />
          <div style={{ textAlign: "center" }}>
            <DeleteLecture
              name={lecture.name}
              id={lecture._id}
              courseId={lecture.course}
            />
          </div>
        </div>
      </div>
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
