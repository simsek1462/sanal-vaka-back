const Choice = require('../models/choice');

exports.createChoice = async (req, res) => {
  try {
    const { choice } = req.body;
    const newChoice = new Choice({ choice });
    await newChoice.save();
    res.status(201).json(newChoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllChoices = async (req, res) => {
  try {
    const choices = await Choice.find();
    res.status(200).json(choices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const choice = await Choice.findById(id);
    if (!choice) {
      return res.status(404).json({ error: 'Choice not found' });
    }
    res.status(200).json(choice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateChoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const { choice } = req.body;
    const updatedChoice = await Choice.findByIdAndUpdate(id, { choice }, { new: true });
    if (!updatedChoice) {
      return res.status(404).json({ error: 'Choice not found' });
    }
    res.status(200).json(updatedChoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteChoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChoice = await Choice.findByIdAndDelete(id);
    if (!deletedChoice) {
      return res.status(404).json({ error: 'Choice not found' });
    }
    res.status(200).json({ message: 'Choice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
