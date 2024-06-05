const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeadTitleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  choices: [{
    type: Schema.Types.ObjectId,
    ref: 'Choice'
  }]
});

const HeadTitle = mongoose.model('HeadTitle', HeadTitleSchema);

module.exports = HeadTitle;
