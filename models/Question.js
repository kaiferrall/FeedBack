const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  count: {
    type: Number,
    default: 0
  }
});

module.exports = Question = mongoose.model("questions", QuestionSchema);
