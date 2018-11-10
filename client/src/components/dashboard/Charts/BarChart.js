import React, { Component } from "react";
import { Bar, Pie } from "react-chartjs-2";

class BarChart extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {}
    };
  }
  /*
  chartData: {
    labels: ["question1", "test", "was it good?"],
    datasets: [
      {
        label: "Question one",
        data: [50, 500, 600],
        backgroundColor: ["#0fc16e", "#0e85c1", "#c10d46"]
      }
    ]
  };
*/
  componentDidMount() {
    const { question } = this.props;
    if (question.type === "mc") {
      let respCount = [0, 0, 0, 0];
      question.responses.forEach(resp => {
        if (resp === 0) respCount[0] = respCount[0] + 1;
        if (resp === 1) respCount[1] = respCount[1] + 1;
        if (resp === 2) respCount[2] = respCount[2] + 1;
        if (resp === 3) respCount[3] = respCount[3] + 1;
      });
      let chartData = {
        labels: question.opts,
        datasets: [
          {
            data: respCount,
            backgroundColor: ["#0fc16e", "#0e85c1", "#c10d46"]
          }
        ]
      };
      this.setState({ chartData: chartData });
    } else if (question.type === "rng") {
      let respCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      question.responses.forEach(resp => {
        if (resp === 0) respCount[0] = respCount[0] + 1;
        if (resp === 1) respCount[1] = respCount[1] + 1;
        if (resp === 2) respCount[2] = respCount[2] + 1;
        if (resp === 3) respCount[3] = respCount[3] + 1;
        if (resp === 4) respCount[4] = respCount[4] + 1;
        if (resp === 5) respCount[5] = respCount[5] + 1;
        if (resp === 6) respCount[6] = respCount[6] + 1;
        if (resp === 7) respCount[7] = respCount[7] + 1;
        if (resp === 8) respCount[8] = respCount[8] + 1;
        if (resp === 9) respCount[9] = respCount[9] + 1;
        if (resp === 10) respCount[10] = respCount[10] + 1;
      });
      let chartData = {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            data: respCount,
            backgroundColor: ["#0fc16e", "#0e85c1", "#c10d46"]
          }
        ]
      };
      this.setState({ chartData: chartData });
    } else if (question.type === "tf") {
      let respCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      question.responses.forEach(resp => {
        if (resp === 0) respCount[0] = respCount[0] + 1;
        if (resp === 1) respCount[1] = respCount[1] + 1;
      });
      let chartData = {
        labels: ["False", "True"],
        datasets: [
          {
            data: respCount,
            backgroundColor: ["#0fc16e", "#0e85c1", "#c10d46"]
          }
        ]
      };
      this.setState({ chartData: chartData });
    }
  }

  render() {
    return (
      <div>
        <Bar
          height={50}
          width={100}
          data={this.state.chartData}
          options={{ maintainAspectRation: false }}
        />
      </div>
    );
  }
}

export default BarChart;
