import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

//Actions
import { createCourse } from "../../../actions/coursesActions";
import { getAllCourses } from "../../../actions/coursesActions";

class CreateCourseForm extends Component {
  constructor() {
    super();
    this.state = {
      course_name: "",
      course_code: "",
      subject: "",
      year: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.errors);
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const courseData = {
      name: this.state.course_name,
      course_code: this.state.course_code,
      subject: this.state.subject,
      year: this.state.year
    };
    this.props.createCourse(courseData, this.props.userId);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="create-course">
        <form onSubmit={this.onSubmit} className="create-course-form">
          <input
            onChange={this.onChange}
            value={this.state.course_code}
            name="course_code"
            className={classnames("form-control", {
              "is-invalid": errors.course_code
            })}
            type="text"
            placeholder="* Course Code"
          />
          <div className="invalid-feedback">{errors.course_code}</div>
          <input
            onChange={this.onChange}
            value={this.state.course_name}
            name="course_name"
            className={classnames("form-control", {
              "is-invalid": errors.course_name
            })}
            type="text"
            placeholder="* Course Name"
          />
          <div className="invalid-feedback">{errors.course_name}</div>
          <input
            onChange={this.onChange}
            value={this.state.subject}
            name="subject"
            className="form-control"
            type="text"
            placeholder="Course Subject"
          />
          <input
            onChange={this.onChange}
            value={this.state.year}
            name="year"
            className="form-control"
            type="text"
            placeholder="Course year"
          />
          <br />
          <button
            onSubmit={this.onSubmit}
            type="submit"
            className="btn btn-dark"
            style={{ borderRadius: "20px" }}
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

CreateCourseForm.propTypes = {
  createCourse: PropTypes.func.isRequired,
  getAllCourses: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  userId: state.status.user.id
});

export default connect(
  mapStateToProps,
  { createCourse, getAllCourses }
)(CreateCourseForm);
