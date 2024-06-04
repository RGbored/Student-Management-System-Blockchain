const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  problemCode: {
    type: String,
    unique: true,
    required: true,
  },
  problemType: {
    type: String,
    enum: ['mcq', 'long answer'],
    required: true,
  },
  problemName: {
    type: String, // Add this field
    required: true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  mcqOptions: [{
    option: {
      type: String,
      required: function() {
        return this.problemType === 'mcq';
      },
    },
    isCorrect: {
      type: Boolean,
      required: function() {
        return this.problemType === 'mcq';
      },
    },
  }],
  problemMarks: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
