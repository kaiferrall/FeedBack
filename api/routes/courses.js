const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");

//Models
const User = require("../../models/User");
const Course = require("../../models/Course");

//Validation functions
const validateCourse = require("../../validation/validateCourse");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { isValid, errors } = validateCourse(req.body);

    if (!isValid) {
      res.status(422).json(errors);
    } else {
      const courseInput = {};
      courseInput.user = req.user.id;
      if (req.body.course_code) courseInput.course_code = req.body.course_code;
      if (req.body.name) courseInput.name = req.body.name;
      if (req.body.year) courseInput.year = req.body.year;
      if (req.body.subject) courseInput.subject = req.body.subject;

      const existingCourse = await Course.findOne({
        course_code: courseInput.course_code,
        name: courseInput.name,
        user: courseInput.user
      }).catch(err => console.log(err));

      if (existingCourse) {
        errors.course =
          "You already have a course with this name and course code";
        res.status(422).json(errors);
      } else {
        new Course(courseInput).save().then(course => {
          res.status(201).json(course);
        });
      }
    }
  }
);

router.get(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.params.id;
    const errors = {};
    User.findById(userId).then(user => {
      if (user) {
        Course.find({ user: userId })
          .sort({ name: 1 })
          .then(courses => {
            if (courses.length > 0) {
              res.status(200).json(courses);
            } else {
              errors.courses = "This user has no courses yet";
              res.status(204).json(errors);
            }
          });
      } else {
        errors.user = "No user found";
        res.status(404).json(errors);
      }
    });
  }
);

module.exports = router;
