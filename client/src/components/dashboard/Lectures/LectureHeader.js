import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { openLecture, closeLecture } from "../../../actions/lectureActions";

class LectureHeader extends Component {
  constructor() {
    super();
    this.state = {
      liveErrors: ""
    };
    this.makeLectureLive = this.makeLectureLive.bind(this);
    this.closeLecture = this.closeLecture.bind(this);
  }

  makeLectureLive() {
    this.props.openLecture(this.props.lecture._id, this.props.lecture.course);
  }

  closeLecture() {
    this.props.closeLecture(this.props.lecture._id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors.live) {
      this.setState({ liveErrors: newProps.errors.live });
    }
  }

  render() {
    const { form, status, notes, _id, date, code, name } = this.props.lecture;
    const { liveErrors } = this.state;
    let formBtn, liveBtn, progress, liveColor;
    let formLink = `/dashboard/form/${_id}`;

    if (typeof form !== "undefined") {
      if (form.length > 0) {
        formBtn = (
          <a id="formBtn" href={formLink} className="btn btn-dark">
            Edit form
          </a>
        );
      } else {
        formBtn = (
          <a id="formBtn" href={formLink} className="btn btn-dark">
            Create form
          </a>
        );
      }
      //Lecture has not been live yet
      if (status.iat === null && status.exp === null) {
        liveBtn = (
          <a
            id="liveBtn"
            href="javascript:void(0)"
            className="btn btn-primary"
            data-toggle="modal"
            data-target=".bd-example-modal-sm"
          >
            Make Live
          </a>
        );
      } else if (status.iat <= Date.now() && status.exp >= Date.now()) {
        //Lecture is currently live
        liveBtn = (
          <a
            id="liveBtn"
            onClick={this.closeLecture}
            href="javascript:void(0)"
            className="btn btn-primary"
          >
            Close Lecture
          </a>
        );
        formBtn = (
          <a id="formBtn" href={formLink} className="btn btn-dark">
            see form
          </a>
        );
        liveColor = "#05c435";
        let percent =
          (100 * (Date.now() - status.iat)) / (status.exp - status.iat);
        let percentWidth = percent + "%";
        progress = (
          <div style={{ height: "8px" }} className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: percentWidth }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        );
      } else {
        //Lecture was live and now is closed
        formBtn = (
          <a id="formBtn" href={formLink} className="btn btn-dark">
            see form
          </a>
        );
      }
    }
    let confirmModal = (
      <div
        className="modal fade bd-example-modal-sm"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div style={{ padding: "20px" }} className="modal-content">
            <p>Are you sure you want to make this lecture live?</p>
            <a
              id="liveBtn"
              href="javascript:void(0)"
              className="btn btn-primary"
              onClick={this.makeLectureLive}
            >
              Yes
            </a>
            <a
              id="confirmCancel"
              href={formLink}
              className="btn btn-dark"
              data-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </a>
            <br />
            <p style={{ color: "red" }}>{liveErrors}</p>
          </div>
        </div>
      </div>
    );
    return (
      <div className="lecture-header">
        <div>
          <h1 style={{ color: liveColor }}>{name}</h1>
          {formBtn}
          {liveBtn}
          {confirmModal}
          <hr />
          <h5>Code: {code}</h5>
          <br />
          <small className="text text-muted">{date}</small>
          <br />
          <h6>{notes}</h6>
        </div>
        {progress}
      </div>
    );
  }
}

LectureHeader.propTypes = {
  openLecture: PropTypes.func.isRequired,
  closeLecture: PropTypes.func.isRequired,
  name: PropTypes.string,
  notes: PropTypes.string,
  form: PropTypes.array,
  status: PropTypes.object,
  _id: PropTypes.string
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { openLecture, closeLecture }
)(LectureHeader);
