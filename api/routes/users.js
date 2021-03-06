const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
//Multer
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, req.user.username + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });
//Models
const User = require("../../models/User");

//Validation functions
const validateRegister = require("../../validation/validateRegister");
const validateLogin = require("../../validation/validateLogin");

// -------------------------------------------------------------------

// @route       /api/users/register
// @params      users register input
// @desc        validates and registers new users
// @authorized  false
router.post("/register", async (req, res) => {
  const { isValid, errors } = validateRegister(req.body);
  if (!isValid) {
    res.status(422).json(errors);
  } else {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      errors.username = "Username already exists";
      res.status(422).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        Courses: []
      });

      bCrypt.genSalt(10, (err, salt) => {
        bCrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          const savedUser = await newUser.save().catch(err => {
            console.log(err);
          });

          const payload = {
            id: savedUser.id,
            username: savedUser.username,
            name: savedUser.name,
            Courses: savedUser.Courses
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 7200 },
            (err, token) => {
              res.status(200).json({
                authorization: "true",
                token: "Bearer " + token
              });
            }
          );
        });
      });
    }
  }
});

// @route       /api/users/login
// @params      users login input
// @desc        validates the users input and logs in on success
// @authorized  false
router.post("/login", (req, res) => {
  const { isValid, errors } = validateLogin(req.body);

  if (!isValid) {
    res.status(422).json(errors);
  } else {
    User.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          bCrypt
            .compare(req.body.password, user.password)
            .then(didMatch => {
              if (didMatch) {
                //jwt payload
                const payload = {
                  id: user.id,
                  username: user.username,
                  name: user.name,
                  Courses: user.Courses
                };
                //Create jwt token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 7200 },
                  (err, token) => {
                    res.status(200).json({
                      authorization: "true",
                      token: "Bearer " + token
                    });
                  }
                );
              } else {
                errors.password = "Incorrect password";
                res.status(422).json(errors);
              }
            })
            .catch(err => console.log(err));
        } else {
          errors.username = "Username doesn't exist";
          res.status(404).json(errors);
        }
      })
      .catch(err => console.log(err));
  }
});

// @route       /api/users/upload
// @params      uploaded photo
// @desc        adds the photo into uploads and adds url to user
// @authorized  true
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("photo"),
  (req, res) => {
    const userId = req.user.id;
    const fileName = req.file ? req.file.filename : null;
    const errors = {};
    //Add photo validation

    if (fileName) {
      User.findById(userId).then(user => {
        if (user) {
          user.photoURL = fileName;
          user.save().then(user => {
            res.status(200).json({ success: "Photo added successfully" });
          });
        } else {
          errors.user = "No user found";
          res.status(422).json(errors);
        }
      });
    } else {
      errors.photo = "No photo uploaded";
      res.status(422).json(errors);
    }
  }
);

// @route       /api/users/current
// @params      none
// @desc        returns the logged in user, from the auth header
// @authorized  true
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const projection = {
      password: 0
    };
    User.findById(req.user.id, projection).then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        errors.user = "No user found";
        res.status(404).json(errors);
      }
    });
  }
);

module.exports = router;
