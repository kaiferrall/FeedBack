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
  },
  notes: {
    type: String
  },
  status: {
    iat: {
      type: Number,
      default: null
    },
    exp: {
      type: Number,
      default: null
    },
    wasLive: {
      type: Date
    }
  },
  code: {
    type: String,
    default: ""
  },
  mongoDate: {
    type: Date,
    default: Date.now()
  },
  form: {
    type: Array,
    default: []
  },
  updateDate: {
    type: String,
    default: ""
  }
});

module.exports = Lecture = mongoose.model("lectures", LectureSchema);
