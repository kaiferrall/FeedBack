import React, { Component } from "react";
import PropTypes from "prop-types";

class LectureCard extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    window.location.href = `/dashboard/lecture/${this.props.lecture._id}`;
  }

  render() {
    const { lecture } = this.props;
    let status, liveStatus;
    const quickData = `/dashboard/course/${lecture.course}/data`;
    const formLink = `/dashboard/form/${lecture._id}`;

    if (lecture.status.exp === null) {
      status = (
        <i
          style={{
            color: "#dbdbdb",
            fontSize: "10px",
            marginRight: "10px"
          }}
          className="fas fa-circle fa-sm"
        />
      );
    } else if (lecture.status.exp < Date.now()) {
      status = (
        <i
          style={{
            color: "#4c54ef",
            fontSize: "10px",
            marginRight: "10px"
          }}
          className="fas fa-circle fa-sm"
        />
      );
      liveStatus = (
        <p id="live-status" className="text text-muted">
          Was live: {new Date(lecture.status.exp).toDateString()}
        </p>
      );
    } else {
      status = (
        <i
          style={{ color: "#05c435", fontSize: "10px", marginRight: "10px" }}
          className="fas fa-circle fa-sm"
        />
      );
    }
    return (
      <div className="lecture-container">
        <div onClick={this.onClick} id="lecture-card" className="lecture-card">
          {status}
          <h5>{lecture.name}</h5>
          <br />
          <small className="text text-muted" style={{ marginLeft: "16px" }}>
            {lecture.date}
          </small>
          <br />
          <div className="lecture-card-content">
            <small>{lecture.notes ? lecture.notes : ""}</small>
            <br />
            {liveStatus}
            <br />
            <a href={formLink} id="see-lecture" className="btn btn-light">
              Form <i className="fas fa-arrow-right" />
            </a>
            <a
              href={quickData}
              id="lecture-form-status"
              className="btn btn-light"
            >
              <i className="far fa-chart-bar" /> Quick Data
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LectureCard;
