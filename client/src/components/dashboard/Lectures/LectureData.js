import React, { Component } from "react";

//Actions
//Components
import BarChart from "../Charts/BarChart";

class LectureData extends Component {
  constructor() {
    super();
  }

  render() {
    const { form } = this.props;
    let data;
    let count = 0;

    if (form) {
      data = form.map((question, index) => {
        return (
          <div key={index}>
            <p>
              Question {index + 1}: {question.text}
            </p>
            <BarChart question={question} />
          </div>
        );
      });
      form.forEach(question => {
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

export default LectureData;
