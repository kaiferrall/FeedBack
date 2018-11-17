import React, { Component } from "react";
import { connect } from "react-redux";

class LectureSettingsContainer extends Component {
  render() {
    return (
      <div>
        <h3>Settings</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(LectureSettingsContainer);
