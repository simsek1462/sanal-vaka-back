const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
    patientName : {type: String, required: true},
    admissionHistory : {type: String , required: true},
    personalHistory: {type: String , required: true},
    familyHistory: {type: String , required: true},
    medicalHistory: {type: String , required: true},
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
      },
      clinic: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Clinic'
      },
      multipleChoiceAnwsers: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Choice',
      }],
      questions: [{
        questionId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Question'
        },
        answer: {
          type: String,
          required: true
        }
      }]

})