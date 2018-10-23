const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const dateformat = require("dateformat");

//Models
const User = require("../../models/User");
const Course = require("../../models/Course");
const Lecture = require("../../models/Lecture");
const Question = require("../../models/Question");

//Validation functions

// -------------------------------------------------------------------

// @route       /api/forms/suggest
// @params      current text user has entered for question text
// @desc        returns the questions with similar texts
// @authorized  true
router.post("/save", (req, res) => {
  const form = req.body.questions;
  const lectureId = req.body.lectureId;
  const now = new Date();
  const date = dateformat(now, "mmmm dS, yyyy, h:MM TT");
  Lecture.findById(lectureId).then(lecture => {
    lecture.form = form;
    lecture.updateDate = date;
    lecture.save().then(lecture => {
      res.status(200).json(lecture.form);
    });
  });
});

// @route       /api/forms/suggest
// @params      current text user has entered for question text
// @desc        returns the questions with similar texts
// @authorized  true
router.post("/suggest", (req, res) => {
  const currentInput = req.body.text;

  if (currentInput.length == 0) {
    res.status(200).json();
  } else {
    const query = new RegExp(currentInput);
    Question.find({ question: { $regex: query, $options: "i" } }).then(
      questions => {
        if (questions.length < 3) res.status(200).json(questions);
        else {
          res.status(200).json(questions.splice(0, 3));
        }
      }
    );
  }
});

// For testing --
router.post("/test/addQuestion", (req, res) => {
  new Question({
    type: "mc",
    question: "Another test question to see how the response is going."
  })
    .save()
    .then(question => {
      console.log(question);
    });
});

module.exports = router;
