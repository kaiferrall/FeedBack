const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  course_code: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  code: {
    type: String,
    default: ""
  },
  year: {
    type: String
  },
  subject: {
    type: String
  },
  lectures: [String]
});

module.exports = Course = mongoose.model("courses", CourseSchema);
