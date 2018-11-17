import React, { Component } from "react";

class MultipleChoice extends Component {
  render() {
    const { option, optionIndex, index } = this.props;
    return (
      <div className="col">
        <input
          onChange={e => {
            this.props.setOption(optionIndex, index, e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Enter option"
          value={option}
          name={index}
        />
      </div>
    );
  }
}

export default MultipleChoice;
