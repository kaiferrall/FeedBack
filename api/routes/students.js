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
router.post("/code", (req, res) => {
  const code = req.body.code;
  Lecture.findOne({
    code: code,
    "status.exp": { $gt: Date.now() },
    "status.iat": { $lt: Date.now() }
  }).then(lecture => {
    if (lecture) {
      res.status(200).json(lecture.form);
    } else {
      res.status(404).json({ lecture: "No live lecture" });
    }
  });
});

// @route       /api/students/submit
// @params      form response from student
// @desc        returns encrypted info token
//              to make sure they dont response twice
// @authorized  true
router.post("/submit/:lectureCode", (req, res) => {
  const lectureCode = req.params.lectureCode;
  const responseData = req.body.response;
  const errors = {};
  responseData.forEach((resp, index) => {
    let parsed = parseInt(resp.response, 10);
    // FIXME: Look into doing the update with the $set operator for less queries
    if (typeof resp.response === "number") {
      console.log("test");
      Lecture.updateOne(
        { code: lectureCode },
        { $push: { ["form." + index + ".responses"]: parsed } }
      )
        .then()
        .catch(err => {
          console.log(err);
        });
    }
  });

  res.status(200).json({ works: true });
});

module.exports = router;
