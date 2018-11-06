const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  lecture: {
    type: Schema.Types.ObjectId,
    ref: "lectures"
  },
  questions: {
    type: Array
  },
  responses: {
    type: Array,
    default: []
  }
});

module.exports = Form = mongoose.model("forms", FormSchema);
