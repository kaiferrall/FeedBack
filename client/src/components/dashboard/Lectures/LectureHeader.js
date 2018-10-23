import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function LectureHeader(props) {
  let formBtn;
  let formLink = `/dashboard/form/${props.id}`;

  if (typeof props.form !== "undefined") {
    if (props.form.length > 0) {
      formBtn = (
        <a id="formBtn" href={formLink} className="btn btn-light">
          Edit form
        </a>
      );
    } else {
      formBtn = (
        <a id="formBtn" href={formLink} className="btn btn-light">
          Create form
        </a>
      );
    }
  }

  return (
    <div>
      <div>
        <h1>{props.name}</h1>
        {formBtn}
        <hr />
        <small className="text text-muted">{props.date}</small>
        <h6>{props.notes}</h6>
      </div>
    </div>
  );
}

LectureHeader.propTypes = {
  name: PropTypes.string,
  notes: PropTypes.string,
  id: PropTypes.string
};

export default LectureHeader;
