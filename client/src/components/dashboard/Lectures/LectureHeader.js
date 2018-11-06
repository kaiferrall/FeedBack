import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { openLecture } from "../../../actions/lectureActions";

class LectureHeader extends Component {
  constructor() {
    super();
    this.makeLectureLive = this.makeLectureLive.bind(this);
  }

  makeLectureLive() {
    this.props.openLecture(this.props.id);
  }

  render() {
    const { form, status, notes, id, date, code, name } = this.props;
    let formBtn, liveBtn;
    let formLink = `/dashboard/form/${id}`;

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
      if (status.iat == null && status.exp == null) {
        liveBtn = (
          <a
            id="liveBtn"
            onClick={this.makeLectureLive}
            href="javascript:void(0)"
            className="btn btn-success"
          >
            Make Live
          </a>
        );
      } else if (status.iat <= Date.now() && status.exp >= Date.now()) {
        liveBtn = (
          <a id="liveBtn" href="javascript:void(0)" className="btn btn-success">
            Live Lecture
          </a>
        );
        formBtn = (
          <a id="formBtn" href={formLink} className="btn btn-dark">
            see form
          </a>
        );
      } else {
        formBtn = (
          <a id="formBtn" href={formLink} className="btn btn-dark">
            see form
          </a>
        );
      }
    }
    return (
      <div className="lecture-header">
        <div>
          <h1>{name}</h1>
          {formBtn}
          {liveBtn}
          <hr />
          <h6 id="lecture-code">code: {code}</h6>
          <small className="text text-muted">{date}</small>
          <h6>{notes}</h6>
        </div>
      </div>
    );
  }
}

LectureHeader.propTypes = {
  openLecture: PropTypes.func.isRequired,
  name: PropTypes.string,
  notes: PropTypes.string,
  form: PropTypes.array,
  status: PropTypes.object,
  id: PropTypes.string
};

export default connect(
  null,
  { openLecture }
)(LectureHeader);
