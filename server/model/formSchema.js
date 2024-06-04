const mongoose = require('mongoose');

const { Schema } = mongoose;

const mcqOptionSchema = new Schema({
  option: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const formSchema = new Schema({
  problemName: {
    type: String,
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  mcqOptions: [mcqOptionSchema],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
