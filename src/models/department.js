const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  testSteps: [{
    type: Schema.Types.ObjectId,
    ref: 'Step'
  }]
});

module.exports = mongoose.model('Department', DepartmentSchema);
