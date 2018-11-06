const express = require("express");
const app = express();

const bodyParser = require("body-parser");
//Deprecation for option parameters in queries. Currently using an older version of mongoose
//remember to update
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require("passport");

//config
const keys = require("./config/keys");

//Routes
const users = require("./api/routes/users");
const courses = require("./api/routes/courses");
const lectures = require("./api/routes/lectures");
const forms = require("./api/routes/forms");
const students = require("./api/routes/students");

//Connect to MLab database
const db = keys.mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/courses", courses);
app.use("/api/lectures", lectures);
app.use("/api/forms", forms);
app.use("/api/students", students);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on port " + port);
});
