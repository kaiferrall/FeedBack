import React, { Component } from "react";
import PropTypes from "prop-types";

//Actions
//Components
import BarChart from "../Charts/BarChart";

class LectureData extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { lecture } = this.props;
    let data;
    let count = 0;

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
      lecture.form.forEach(question => {
        count = count + question.responses.length;
      });
    }

    return (
      <div>
        <p>{count > 0 ? "Total Responses:" + count : ""}</p>
        {data}
        <div style={{ textAlign: "center", marginTop: "40px" }} />
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
