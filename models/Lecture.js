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
  code: {
    type: String,
    default: ""
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
  mongoDate: {
    type: Date,
    default: Date.now()
  },
  form: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: null
  },
  updateDate: {
    type: String,
    default: ""
  }
});

module.exports = Lecture = mongoose.model("lectures", LectureSchema);
