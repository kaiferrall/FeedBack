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

//Validation functions
const validateLecture = require("../../validation/validateLecture");

// -------------------------------------------------------------------

// @route       /api/lectures/create
// @params      users input
// @desc        validates and creates a new lecture
// @authorized  true
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, errors } = validateLecture(req.body);
    const courseId = req.body.courseId;
    const userId = req.user.id;

    if (!isValid) {
      res.status(422).json(errors);
    } else {
      const course = await Course.findOne({
        _id: courseId,
        user: userId
      }).catch(err => console.log(err));

      if (course) {
        const lectureInput = {};
        const now = new Date();
        const date = dateformat(now, "mmmm dS, yyyy, h:MM TT");
        if (req.body.date) {
          lectureInput.date = req.body.date;
        } else {
          lectureInput.date = date;
        }
        lectureInput.name = req.body.name;
        lectureInput.user = userId;
        lectureInput.course = courseId;

        new Lecture(lectureInput).save().then(lecture => {
          course.lectures.push(lecture._id);
          course.save().then(course => {
            res.status(200).json({ success: "Lecture created" });
          });
        });
      } else {
        errors.course = "No course found";
        res.status(404).json(errors);
      }
    }
  }
);

module.exports = router;
