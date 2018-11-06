import React, { Component } from "react";
import PropTypes from "prop-types";

import loadingGif from "../loadingGif.gif";

function CourseListLoading(props) {
  return (
    <div id="course-card-loading">
      <img id="card-loading-gif" src={loadingGif} />
    </div>
  );
}

export default CourseListLoading;
