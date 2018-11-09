import React, { Component } from "react";
import PropTypes from "prop-types";

class CourseCard extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    window.location.href = `/dashboard/course/${this.props.course._id}`;
  }
  componentDidMount() {
    const windowLocation = window.location.href.split("/")[5];
    if (windowLocation == this.props.course._id) {
      this.setState({ selected: true });
    } else if (this.props.course.lectures.indexOf(windowLocation) >= 0) {
      this.setState({ selected: true });
    }
  }
  render() {
    const length = this.props.course.lectures.length;
    let style, style2, lecturesCount;
    if (this.state.selected) {
      style = {
        backgroundColor: "#e8f0ff",
        color: "#00359F",
        border: ".5px solid white"
      };
    }
    if (length === 0) {
      lecturesCount = "";
    } else if (length === 1) {
      lecturesCount = length + " lecture";
    } else {
      lecturesCount = length + " lectures";
    }
    return (
      <div
        onClick={this.onClick}
        style={style}
        id="course-card"
        className="card"
      >
        <div id="course-card-body" className="card-body">
          <h5 style={style2}>{this.props.course.name}</h5>
          <h6 style={style2}>{this.props.course.course_code}</h6>
          <small style={{ color: "#0050EF" }}>{lecturesCount}</small>
        </div>
      </div>
    );
  }
}

export default CourseCard;
