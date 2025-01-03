const Choice = require('../models/choice');
const HeadTitle = require('../models/headTitle');
const mongoose = require('mongoose');

exports.createChoice = async (req, res) => {
  try {
    const { choice, headTitleId } = req.body;
    const newChoice = new Choice({ choice });
    await newChoice.save();
    const headTitle = await HeadTitle.findById(headTitleId);
    if (!headTitle) {
      return res.status(404).json({ error: 'HeadTitle not found' });
    }
    headTitle.choices.push(newChoice._id);
    await headTitle.save();

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
  console.log("girdi");
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

exports.getChoicesByIds = async (req, res) => {
  console.log("Request received");
  try {
    const { arrayOfId } = req.body;
    console.log("Array of IDs", arrayOfId);

    const choices = [];
    
    for (const id of arrayOfId) {
      // Validate if the ID is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(id)) {
        const choice = await Choice.findById(id);
        if (choice) {
          choices.push(choice);
        } else {
          console.log(`Choice with ID ${id} not found`);
        }
      } else {
        console.log(`Invalid ObjectId: ${id}`);
      }
    }

    res.status(200).json(choices);
  } catch (error) {
    console.error("Error:", error);
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
    const { headTitleId } = req.body;
    const deletedChoice = await Choice.findByIdAndDelete(id);
    if (!deletedChoice) {
      return res.status(404).json({ error: 'Choice not found' });
    }

    const headTitle = await HeadTitle.findById(headTitleId);
    if (!headTitle) {
      return res.status(404).json({ error: 'HeadTitle not found' });
    }
    
    headTitle.choices.pull(id);
    await headTitle.save();

    res.status(200).json({ message: 'Choice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};