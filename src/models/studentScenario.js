const mongoose = require('mongoose');

const StudentScenarioSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref:"User"
  },
  scenarioId: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Scenario"
  },
  score: {
    type: Number,
    default: 0 // Başlangıçta öğrenci puanı 0
  },
  attemptsLeft: {
    type: Number,
    default: 3 // Başlangıçta öğrenciye 3 deneme hakkı verelim
  }
});

const StudentScenario = mongoose.model('StudentScenario', StudentScenarioSchema);

module.exports = StudentScenario;
