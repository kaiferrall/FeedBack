const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("../../config/keys");
const dateformat = require("dateformat");
const randomString = require("randomstring");
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
        if (req.body.notes) {
          lectureInput.notes = req.body.notes;
        }
        lectureInput.name = req.body.name;
        lectureInput.user = userId;
        lectureInput.course = courseId;
        lectureInput.code = randomString.generate(8);
        lectureInput.form = [];

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

// @route       /api/lectures/delete/:id
// @params      lecture Id
// @desc        deletes a lecture from provided Id
// @authorized  true
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const lectureId = req.params.id;
    const errors = {};

    const lecture = await Lecture.findOne({ _id: lectureId, user: userId });
    const course = await Course.findOne({ lectures: lectureId });
    if (lecture) {
      if (lecture.user == userId) {
        await lecture.remove();
        //course.lectures.indexof
        //Add query to delete all the lectures for this course
        res.status(200).json({ success: "Lecture deleted" });
      } else {
        errors.authorization = "unauthorized";
        res.status(401).json(errors);
      }
    } else {
      errors.course = "No lecture found";
      res.status(404).json(errors);
    }
  }
);

// @route       /api/lectures/open/:id
// @params      lecture Id
// @desc        opens a lecture
// @authorized  true
router.put(
  "/open/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const errors = {};
    const lectureId = req.params.id;
    const userId = req.user.id;
    Lecture.findOne({ _id: lectureId, user: userId })
      .then(lecture => {
        if (lecture) {
          if (lecture.status.exp == null || lecture.status.exp < Date.now()) {
            lecture.status.iat = Date.now();
            lecture.status.exp = Date.now() + 3600 * 1000;
            lecture.save().then(lecture => {
              res.status(200).json({ success: "Lecture is live" });
            });
          } else {
            errors.lecture = "Lecture is currently live";
            res.status(409).json(errors);
          }
        } else {
          errors.lecture = "No lecture found";
          res.status(404).json(errors);
        }
      })
      .catch(err => console.log(err));
  }
);

// @route       /api/lectures/close/:id
// @params      lecture Id
// @desc        closes a lecture
// @authorized  true
router.put(
  "/close/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const lectureId = req.params.id;
    const userId = req.user.id;

    Lecture.findOne({ _id: lectureId, user: userId })
      .then(lecture => {
        if (lecture) {
          if (lecture.status.exp !== null || lecture.status.exp > Date.now()) {
            lecture.status.exp = lecture.status.iat;
            lecture.save().then(lecture => {
              res.status(200).json({ success: "Lecture is closed" });
            });
          } else {
            errors.lecture = "Lecture is already closed";
            res.status(409).json(errors);
          }
        } else {
          errors.lecture = "No lecture found";
          res.status(404).json(errors);
        }
      })
      .catch(err => console.log(err));
  }
);

// @route       /api/lectures/all/:id
// @params      course Id
// @desc        returns all lectures based on course
// @authorized  true
router.get(
  "/all/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const courseId = req.params.id;
    const errors = {};
    Lecture.find({ course: courseId })
      .sort({ mongoDate: -1 })
      .then(lectures => {
        if (lectures.length > 0) {
          res.status(200).json(lectures);
        } else {
          errors.lectures = "This user has no lectures yet";
          res.status(204).json(errors);
        }
      });
  }
);

// @route       /api/lectures/lecture/:id
// @params      Lecture Id
// @desc        returns one lecture
// @authorized  true
router.get(
  "/lecture/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    //Ensure its only the Id
    const lectureId = req.params.id.substr(0, 24);
    const errors = {};
    Lecture.findById(lectureId).then(lecture => {
      if (lecture) {
        res.status(200).json(lecture);
      } else {
        errors.lecture = "No lecture found";
        res.status(404).json(errors);
      }
    });
  }
);

// @route       /api/lectures/form/create
// @params      lecture Id
// @desc        adds a form to the lecture (needs to be tested)
// @authorized  true
router.put(
  "/form/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const questions = req.body.questions;
    const lectureId = req.body.lectureId;

    Lecture.findById(lecturedId).then(lecture => {
      lecture.form = questions;
      lecture.save().then(lecture => {
        res.status(200).json({ status: "Created or updated" });
      });
    });
  }
);
module.exports = router;
