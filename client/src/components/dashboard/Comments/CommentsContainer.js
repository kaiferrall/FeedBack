import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Actions
import { getLecture } from "../../../actions/lectureActions";
//Components
import CommentCard from "./CommentCard";

class CommentContainer extends Component {
  constructor() {
    super();
    this.state = {
      status: {},
      comments: []
    };
    this.reloadData = this.reloadData.bind(this);
  }
  componentDidMount() {
    const resource = window.location.href.split("/")[5];
    if (resource.length < 24) {
      window.location.href = "/error/404";
    } else {
      const lectureId = resource.slice(0, 24);
      this.props.getLecture(lectureId);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.comments != null) {
      this.setState({ comments: newProps.comments, status: newProps.status });
    } else {
      let redirect = `/dashboard/lecture/${newProps.Id}`;
      window.location.href = redirect;
    }
  }

  reloadData() {
    this.props.getLecture(this.props.Id);
  }
  render() {
    const { comments, status } = this.state;
    let commentsList, refreshBtn;
    if (comments.length > 0) {
      commentsList = comments.map((comment, index) => {
        return <CommentCard key={index} comment={comment} />;
      });
    }
    if (status.iat < Date.now() && status.exp > Date.now()) {
      refreshBtn = (
        <a onClick={this.reloadData} href="javascript:void(0)">
          <i className="fas fa-redo-alt" />
          {"   "}Refresh Comments
        </a>
      );
    }
    return (
      <div>
        <a
          style={{ fontSize: "16px", marginTop: "20px", color: "black" }}
          href="javascript:history.back()"
        >
          <i className="fas fa-chevron-left" />
          {"  "}Back
        </a>
        <br />
        <br />
        <div>
          <h2>Comments</h2>
        </div>
        {refreshBtn}
        <hr />
        {commentsList}
      </div>
    );
  }
}

CommentContainer.propTypes = {
  comments: PropTypes.array,
  Id: PropTypes.string,
  status: PropTypes.object
};

const mapStateToProps = state => ({
  comments: state.lectures.lecture.comments,
  Id: state.lectures.lecture._id,
  status: state.lectures.lecture.status
});

export default connect(
  mapStateToProps,
  { getLecture }
)(CommentContainer);
