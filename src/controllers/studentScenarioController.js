const config = require('../config/config');
const jwt = require('jsonwebtoken');
const Scenario = require('../models/scenario');
const StudentScenario = require('../models/studentScenario');
const { verifyTokens } = require('./authController');

exports.getAllStudentScenarios = async (req, res) => {
    try {

        const studentScenarios = await StudentScenario.find();
        res.status(200).json(studentScenarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentScenarioById = async (req, res) => {
    try {
        const studentScenario = await StudentScenario.findById(req.params.id);
        if (!studentScenario) {
            return res.status(404).json({ message: 'Öğrenci senaryo ilişkisi bulunamadı' });
        }
        res.status(200).json(studentScenario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createOrUpdateStudentScenario = async (req, res) => {
    try {
        const { scenarioId, selectedChoices, selectedQuestions } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        let userId;
        if (!token) {
            return res.sendStatus(401);
        }
        try {
            const decodedToken = jwt.verify(token, config.secret);
            userId = decodedToken.id;
        } catch (error) {
            return res.sendStatus(401);
        }
        const scenario = await Scenario.findById(scenarioId).populate('multipleChoiceAnwsers').populate('questions.questionId');
        if (!scenario) {
            return res.status(404).json({ error: 'Scenario not found' });
        }

        let studentScenario = await StudentScenario.findOne({ studentId: userId, scenarioId });

        if (studentScenario) {
            // If StudentScenario exists, check attemptsLeft
            if (studentScenario.attemptsLeft <= 0) {
                return res.status(400).json({ error: 'No attempts left' });
            }

            // Update existing StudentScenario
            studentScenario.attemptsLeft -= 1;
        } else {
            // Create new StudentScenario
            studentScenario = new StudentScenario({
                studentId: userId,
                scenarioId,
                score: 0,
                attemptsLeft: 3 // Or any default value
            });
        }

        // Calculate score
        let totalScore = 0;

        // Multiple choice answers scoring
        selectedChoices.forEach(choiceId => {
            if (scenario.multipleChoiceAnwsers.some(answer => answer.equals(choiceId))) {
                totalScore += 18; // Doğru cevap için puan ekleyin
            } else {
                totalScore -= 3; // Yanlış cevap için puan azaltın
            }
        });

        // Questions scoring
        selectedQuestions.forEach(({ questionId }) => {
            if (scenario.questions.some(q => q.questionId.equals(questionId))) {
                totalScore += 18; // Doğru cevap için puan ekleyin
            } else {
                totalScore -= 3; // Yanlış cevap için puan azaltın
            }
        });

        studentScenario.score = totalScore;

        await studentScenario.save();

        res.status(201).json(studentScenario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createOrFetchStudentScenarios = async (req, res) => {
    try {
        const { scenarioIds } = req.body;

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        let userId;
        if (!token) {
            return res.sendStatus(401);
        }
        try {

            const decodedToken = jwt.verify(token, config.secret);
            userId = decodedToken.id;

        } catch (error) {
            return res.sendStatus(401);
        }

        // Ensure scenarioIds is an array
        if (!Array.isArray(scenarioIds)) {
            return res.status(400).json({ error: 'scenarioIds should be an array' });
        }

        // Loop through each scenarioId
        for (const scenarioId of scenarioIds) {


            const scenario = await Scenario.findById(scenarioId);
            if (!scenario) {
                return res.status(404).json({ error: `Scenario with ID ${scenarioId} not found` });
            }

            let studentScenario = await StudentScenario.findOne({ studentId: userId, scenarioId });

            if (!studentScenario) {
                // Create new StudentScenario if not exists
                studentScenario = new StudentScenario({
                    studentId: userId,
                    scenarioId,
                    score: 0,
                    attemptsLeft: 4
                });
                await studentScenario.save();
            }
        }

        const allStudentScenarios = await StudentScenario.find({
            studentId: userId,
            scenarioId: { $in: scenarioIds }
        }).populate('scenarioId');

        res.status(200).json(allStudentScenarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateStudentScenario = async (req, res) => {
    try {
        const { studentId, scenarioId, score, attemptsLeft } = req.body;
        const studentScenario = await StudentScenario.findById(req.params.id);
        if (!studentScenario) {
            return res.status(404).json({ message: 'Öğrenci senaryo ilişkisi bulunamadı' });
        }
        studentScenario.studentId = studentId;
        studentScenario.scenarioId = scenarioId;
        studentScenario.score = score;
        studentScenario.attemptsLeft = attemptsLeft;
        await studentScenario.save();
        res.status(200).json(studentScenario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteStudentScenario = async (req, res) => {
    try {
        const studentScenario = await StudentScenario.findByIdAndDelete(req.params.id);
        if (!studentScenario) {
            return res.status(404).json({ message: 'Öğrenci senaryo ilişkisi bulunamadı' });
        }
        res.status(200).json({ message: 'Öğrenci senaryo ilişkisi başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
