const Question = require('../models/question');

exports.createQuestion = async (req, res) => {
  try {
    const { title, question } = req.body;
    const newQuestion = new Question({ title, question });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, question } = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(id, { title, question }, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};