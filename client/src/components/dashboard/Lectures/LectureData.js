import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions
//Components
import BarChart from "../Charts/BarChart";

class LectureData extends Component {
  render() {
    const { lecture } = this.props;
    let data;
    if (lecture.form) {
      data = lecture.form.map((question, index) => {
        return (
          <div key={question.text}>
            <p>
              Question {index + 1}: {question.text}
            </p>
            <BarChart question={question} />
          </div>
        );
      });
    }
    return (
      <div>
        {data}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a style={{ color: "red" }} href="javascript:void(0)">
            Delete Lecture
          </a>
        </div>
      </div>
    );
  }
}

LectureData.propTypes = {
  lecture: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lecture: state.lectures.lecture
});

export default LectureData;
