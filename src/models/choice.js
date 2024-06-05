const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChoiceSchema = new Schema({
  choice: {
    type: String,
    required: true
  }
});

const Choice = mongoose.model('Choice', ChoiceSchema);

module.exports = Choice;
