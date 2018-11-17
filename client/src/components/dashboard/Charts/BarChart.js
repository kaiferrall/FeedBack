import React, { Component } from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";

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

  componentWillReceiveProps(newProps) {
    if (newProps.question) {
      const { question } = newProps;
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
  }

  render() {
    return (
      <div className="bar-chart-container">
        {this.props.question.type === "tf" ? (
          <HorizontalBar
            type="horizontalBar"
            height={30}
            width={100}
            data={this.state.chartData}
            options={options}
          />
        ) : (
          <Bar
            height={45}
            width={100}
            data={this.state.chartData}
            options={options}
          />
        )}
      </div>
    );
  }
}

export default BarChart;

const options = {
  maintainAspectRation: false,
  title: {
    display: false
  },
  scales: {
    yAxes: [
      {
        display: true,
        ticks: {
          beginAtZero: true
        }
      }
    ],
    xAxes: [
      {
        display: true,
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
