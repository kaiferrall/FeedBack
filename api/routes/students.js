const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const dateformat = require("dateformat");

//Models
const Lecture = require("../../models/Lecture");

// -------------------------------------------------------------------

// @route       /api/students/code
// @params      code the student entered
// @desc        returns form
// @authorized  true
router.post("/code", async (req, res) => {
  const code = req.body.code;
  const lecture = await Lecture.findOne({
    code: code,
    "status.exp": { $gt: Date.now() },
    "status.iat": { $lt: Date.now() }
  });
  if (lecture) {
    let commentStatus = lecture.comments == null ? false : true;
    res.status(200).json({ form: lecture.form, commentStatus: commentStatus });
  } else {
    res.status(404).json({ lecture: "No live lecture" });
  }
});

// @route       /api/students/submit
// @params      form response from student
// @desc        returns encrypted info token
// @authorized  true
//TODO::   to make sure they dont response twice
router.post("/submit/:lectureCode", async (req, res) => {
  const lectureCode = req.params.lectureCode;
  const { response, comment } = req.body;
  const errors = {};
  response.forEach(async (resp, index) => {
    if (resp) {
      let parsed = parseInt(resp.response, 10);
      // FIXME: Look into doing the update with the $set operator for less queries
      if (typeof parsed === "number") {
        await Lecture.updateOne(
          { code: lectureCode },
          { $push: { ["form." + index + ".responses"]: parsed } }
        ).catch(err => {
          console.log(err);
        });
      }
    }
  });

  if (comment) {
    let lecture = await Lecture.findOne({ code: lectureCode }).catch(err => {
      console.log(err);
    });
    if (lecture && lecture.comments != null) {
      lecture.comments.unshift(comment);
      lecture.save();
    }
  }
  res.status(200).json({ success: "Response saved" });
});

module.exports = router;
