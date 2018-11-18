const express = require("express");
const router = express.Router();

//Models
const Lecture = require("../../models/Lecture");
const Course = require("../../models/Course");
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
  }).catch(err => {
    console.log(err);
  });
  if (lecture) {
    res.status(200).json(lecture.form);
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
  const responseData = req.body.response;

  const liveLecture = await Lecture.findOne({
    code: lectureCode,
    "status.exp": { $gt: Date.now() },
    "status.iat": { $lt: Date.now() }
  }).catch(err => {
    console.log(err);
  });

  responseData.forEach(async (resp, index) => {
    if (resp) {
      let parsed = parseInt(resp.response, 10);
      // FIXME: Look into doing the update with the $set operator for less queries
      if (typeof parsed === "number") {
        liveLecture.form[index].responses.push(parsed);
      }
    }
  });

  console.log(liveLecture.form);

  await Lecture.updateOne(
    { _id: liveLecture._id },
    { $set: { form: liveLecture.form } }
  ).catch(err => {
    console.log(err);
  });

  status(200).json({ works: true });
});

// await Lecture.updateOne(
//   { code: lectureCode },
//   { $push: { ["form." + index + ".responses"]: parsed } }
// ).catch(err => {
//   console.log(err);
// });

module.exports = router;
