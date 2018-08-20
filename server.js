const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

//config
const keys = require("./config/keys");

//Routes

//Connect to MLab database
const db = keys.mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
require("./config/passport")(passport);

//Use Routes
app.use("/test", (req, res) => {
  res.status(200).json({ test: "Test route" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("App listening on port" + port);
});
