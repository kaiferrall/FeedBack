import React, { Component } from "react";
import { Bar, Pie } from "react-chartjs-2";

//Helper functions
import { multipleChoice, range, trueOrFalse } from "./dataFormatters";
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
    let chartData;
    if (question.type === "mc") {
      chartData = multipleChoice(question);
      this.setState({ chartData: chartData });
    } else if (question.type === "rng") {
      chartData = range(question);
      this.setState({ chartData: chartData });
    } else if (question.type === "tf") {
      chartData = trueOrFalse(question);
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
          options={options}
        />
      </div>
    );
  }
}

export default BarChart;

const options = {
  maintainAspectRation: false,
  scales: {
    yAxes: [
      {
        display: true,
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
