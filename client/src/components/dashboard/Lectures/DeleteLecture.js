import React, { Component } from "react";
import { deleteLecture } from "../../../actions/lectureActions";
import { connect } from "react-redux";

class DeleteLecture extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.onChange = this.onChange.bind(this);
    this.deleteLecture = this.deleteLecture.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteLecture() {
    if (this.state.name === this.props.name) {
      this.props.deleteLecture(this.props.id, this.props.courseId);
    }
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <button
          id="delete-lecture-btn"
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#deleteModal"
        >
          <i className="fas fa-exclamation-circle" />
          {"   "}Delete {name}
        </button>

        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div id="lecture-delete-body" className="modal-content">
              <div id="lecture-delete-body">
                <p>
                  Please input the lecture name to delete it. Note this cannot
                  be undone.
                </p>
                <input
                  value={this.state.name}
                  onChange={this.onChange}
                  name="name"
                  className="form-control"
                  type="text"
                  placeholder="Lecture name"
                />
                <hr />
                <button
                  id="cancelDelete"
                  type="button"
                  className="btn btn-dark"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <br />
                <br />
                <button
                  onClick={this.deleteLecture}
                  id="delete-lecture-btn"
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteLecture }
)(DeleteLecture);
