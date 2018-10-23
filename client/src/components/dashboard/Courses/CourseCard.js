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
    let style, style2;
    if (this.state.selected) {
      style = {
        backgroundColor: "#f4f4f4",
        color: "white",
        border: ".5px solid white"
      };
    }
    return (
      <div
        onClick={this.onClick}
        style={style}
        id="course-card"
        className="card"
      >
        <div className="card-body">
          <h5 style={style2}>{this.props.course.name}</h5>
          <h6 style={style2}>{this.props.course.course_code}</h6>
          <small style={style2}>{length} Lectures</small>
        </div>
      </div>
    );
  }
}

export default CourseCard;
