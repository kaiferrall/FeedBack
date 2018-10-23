const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true
  },
  Courses: [String],
  tutorial: {
    type: Boolean,
    default: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
