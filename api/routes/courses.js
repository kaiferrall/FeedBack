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

// -------------------------------------------------------------------

// @route       /api/courses/create
// @params      users input
// @desc        validates and creates a new course
// @authorized  true
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
        errors.course_code =
          "You already have a course with this name and course code";
        res.status(422).json(errors);
      } else {
        User.findById(req.user.id).then(user => {
          if (user) {
            new Course(courseInput).save().then(course => {
              user.Courses.push(course._id);
              user.save().then(() => {
                res.status(200).json(course);
              });
            });
          }
        });
      }
    }
  }
);

// @route       /api/courses/all/:id
// @params      the users Id
// @desc        returns all the courses for a user
// @authorized  true
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
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
              res.status(404).json(errors);
            }
          });
      } else {
        errors.user = "No user found";
        res.status(404).json(errors);
      }
    });
  }
);

// @route       /api/courses/delete/:id
// @params      course Id
// @desc        deletes a course from provided Id
// @authorized  true
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const courseId = req.params.id;
    const errors = {};

    const course = await Course.findOne({ _id: courseId, user: userId });

    if (course) {
      if (course.user == userId) {
        await course.remove();
        //Add query to delete all the lectures for this course
        res.status(200).json({ success: "Course deleted" });
      } else {
        errors.authorization = "unauthorized";
        res.status(401).json(errors);
      }
    } else {
      errors.course = "No course found";
      res.status(404).json(errors);
    }
  }
);

// @route       /api/courses/:id
// @params      userId
// @desc        returns all the courses for given user
// @authorized  true
//This is already made, can be deleted
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.params.id;
    const errors = {};

    Course.find({ user: userId })
      .sort({ name: 1 })
      .then(courses => {
        if (courses.length > 0) {
          res.status(200).json(courses);
        } else {
          errors.courses = "No courses found for this user";
          res.status(404).json(errors);
        }
      });
  }
);

module.exports = router;
