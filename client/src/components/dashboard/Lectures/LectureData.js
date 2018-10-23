import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bar, Pie } from "react-chartjs-2";

class LectureData extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {
        labels: ["question1", "test", "was it good?"],
        datasets: [
          {
            label: "Question one",
            data: [50, 500, 600],
            backgroundColor: ["#0fc16e", "#0e85c1", "#c10d46"]
          }
        ]
      }
    };
  }
  render() {
    return (
      <div>
        <p>Question One here</p>
        <hr />
        <Bar
          data={this.state.chartData}
          options={{ maintainAspectRation: false }}
        />
        <p>Question two here</p>
        <hr />
        <p>Question three here</p>
      </div>
    );
  }
}

LectureData.propTypes = {
  form: PropTypes.array
};

export default LectureData;
