import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

//Actions
import { createLecture } from "../../../actions/lectureActions";
class CreateLectureForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      date: "",
      notes: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const lectureData = {
      courseId: this.props.courseId,
      name: this.state.name,
      notes: this.state.notes,
      date: this.state.date
    };
    //Add validator
    this.props.createLecture(lectureData);
    this.setState({ name: "", date: "", notes: "", errors: {} });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="create-course">
        <form onSubmit={this.onSubmit} className="create-lecture-form">
          <input
            onChange={this.onChange}
            value={this.state.name}
            name="name"
            className={classnames("form-control", {
              "is-invalid": errors.name
            })}
            type="text"
            placeholder="* Add a quick and descriptive name"
          />
          <div className="invalid-feedback">{errors.name}</div>
          <br />
          <textarea
            rows="2"
            onChange={this.onChange}
            value={this.state.notes}
            name="notes"
            className="form-control"
            type="text"
            placeholder="Topics discussed"
          />
          <br />
          <input
            onChange={this.onChange}
            value={this.state.date}
            name="date"
            className={classnames("form-control", {
              "is-invalid": errors.date
            })}
            type="date"
            placeholder="Date of lecture"
          />
          <br />
          <button
            onSubmit={this.onSubmit}
            type="submit"
            className="btn btn-dark"
            id="create-lecture-btn"
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

CreateLectureForm.propTypes = {
  createLecture: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createLecture }
)(CreateLectureForm);
