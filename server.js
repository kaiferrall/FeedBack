const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
//Deprecation for option parameters in queries. Currently using an older version of mongoose
//remember to update
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require("passport");

//Allow cross domains
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

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

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on port " + port);
});
