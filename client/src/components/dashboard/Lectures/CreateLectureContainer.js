import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

//Actions
//Components
import CreateLectureForm from "./CreateLectureForm";
class CreateLectureContainer extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {}
  onChange(e) {}
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="create-lecture-container">
          <p>
            <a
              style={{ fontSize: "12px" }}
              id="create-lecture-a"
              className="btn"
              data-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i style={{ marginRight: "10px" }} className="fas fa-plus" />
              New Lecture
            </a>
          </p>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <CreateLectureForm courseId={this.props.courseId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateLectureContainer.propTypes = {
  courseId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CreateLectureContainer);
