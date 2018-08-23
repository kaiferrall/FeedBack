const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LectureSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "courses"
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = Lecture = mongoose.model("lectures", LectureSchema);
