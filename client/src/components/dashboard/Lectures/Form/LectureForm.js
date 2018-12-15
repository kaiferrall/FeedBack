import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import isEmpty from "../../../../utilities/isEmpty";
import LectureQuestion from "./LectureQuestion";
//Actions
import { saveForm, getLecture } from "../../../../actions/lectureActions";

class LectureForm extends Component {
  constructor(props) {
    super();
    this.state = {
      form: [],
      status: "",
      disabled: false
    };
    this.addQuestion = this.addQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.selectType = this.selectType.bind(this);
    this.setText = this.setText.bind(this);
    this.setOption = this.setOption.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  componentWillMount() {
    const resource = window.location.href.split("/")[5];
    if (resource.length < 24) {
      window.location.href = "/error/404";
    } else {
      const lectureId = resource.slice(0, 24);
      this.props.getLecture(lectureId);
    }
  }

  //Loading in the lectures current form
  componentWillReceiveProps(newProps) {
    if (
      (newProps.lecture.status.iat <= Date.now() &&
        newProps.lecture.status.exp >= Date.now()) ||
      (newProps.lecture.status.iat !== null &&
        newProps.lecture.status.exp !== null)
    ) {
      this.setState({ disabled: true });
    }
    if (newProps.lecture.form) {
      this.setState({ form: newProps.lecture.form });
    }
  }
  addQuestion() {
    if (this.state.form.length < 8) {
      this.setState({
        form: [...this.state.form, { type: "", text: "", opts: [] }]
      });
    }
  }
  setOption(optionIndex, formIndex, value) {
    const newState = [...this.state.form];
    newState[formIndex].opts[optionIndex] = value;
    this.setState({ form: newState });
  }
  setText(e) {
    if (!this.state.disabled) {
      const newState = [...this.state.form];
      newState[e.target.name].text = e.target.value;
      this.setState({ form: newState });
    }
  }

  selectType(e) {
    if (!this.state.disabled) {
      const newState = [...this.state.form];
      newState[e.target.name].type = e.target.value;
      this.setState({ form: newState });
    }
  }

  removeQuestion(e, index) {
    const newState = [...this.state.form];
    newState.splice(index, 1);
    this.setState({ form: newState });
  }

  saveForm(e) {
    const lectureId = window.location.href.split("/")[5].slice(0, 24);
    var noType = false;
    const questionAndId = {
      lectureId: lectureId,
      questions: this.state.form
    };
    //Check if every question has a type
    for (var i = 0; i < questionAndId.questions.length; i++) {
      if (isEmpty(questionAndId.questions[i].type)) {
        noType = true;
        break;
      }
    }
    if (noType) {
      this.setState({ status: "Missing type" });
    } else {
      this.setState({ status: "Saved" });
      this.props.saveForm(questionAndId);
    }
  }

  render() {
    const { lecture } = this.props;
    const { form } = this.state;

    let questions, updateDate, save, addQuestion, formStatus;
    let lectureFormClass = "lecture-form";

    if (lecture.updateDate) {
      if (lecture.updateDate) {
        updateDate = "Last Updated: " + lecture.updateDate;
      } else {
        updateDate = "First draft";
      }
    }
    if (!this.state.disabled) {
      save = (
        <button
          style={{ marginTop: "20px", borderRadius: "20px" }}
          className="btn btn-light"
          onClick={this.saveForm}
        >
          Save
        </button>
      );
      addQuestion = (
        <a onClick={this.addQuestion} href="javascript:void(0)" className="btn">
          Add Question
        </a>
      );
    }
    if (this.state.status === "Missing type") {
      formStatus = (
        <div
          style={{
            color: "#cc2424",
            marginTop: "15px",
            textAlign: "center"
          }}
        >
          <p>
            <i className="fas fa-exclamation-triangle" /> Oops make sure each
            question has a type
          </p>
        </div>
      );
      lectureFormClass = "lecture-form-missingType";
    }
    if (this.state.status === "Saved") {
      formStatus = (
        <div
          style={{
            color: "#499359",
            marginTop: "15px",
            textAlign: "center"
          }}
        >
          <p>
            Saved <i className="fas fa-check" />
          </p>
        </div>
      );
      lectureFormClass = "lecture-form-saved";
    }
    if (form.length > 0) {
      questions = form.map((question, index) => (
        <LectureQuestion
          setText={this.setText}
          selectType={this.selectType}
          setOption={this.setOption}
          removeQuestion={this.removeQuestion}
          disabled={this.state.disabled}
          type={question.type}
          text={question.text}
          opts={question.opts}
          index={index}
          key={index}
        />
      ));
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
        <div className={lectureFormClass}>
          <h4>{lecture.name}</h4>
          <h6 id="update-date" className="text text-muted">
            {updateDate}
          </h6>
          {addQuestion}
          {questions}
          <br />
          {save}
          <hr />
          {formStatus}
        </div>
      </div>
    );
  }
}

LectureForm.propTypes = {
  lecture: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  lecture: state.lectures.lecture
});

export default connect(
  mapStateToProps,
  { saveForm, getLecture }
)(LectureForm);

// const links = (
//   <div>
//     <a style={{ fontSize: "12px", color: "black" }} href="/dashboard">
//       <i className="fas fa-chevron-right" />
//       {"  "}dashboard
//     </a>
//     {"    "}
//     <a
//       style={{ fontSize: "12px", color: "black" }}
//       href={"/dashboard/course/" + lecture.course}
//     >
//       <i className="fas fa-chevron-right" />
//       {"  "}course
//     </a>
//     {"    "}
//     <a
//       style={{ fontSize: "12px", color: "black" }}
//       href={"/dashboard/lecture/" + lecture._id}
//     >
//       <i className="fas fa-chevron-right" />
//       {"  "}lecture
//     </a>
//   </div>
// );
