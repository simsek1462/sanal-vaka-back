const HeadTitle = require('../models/headTitle');
const Step = require('../models/step');

exports.createHeadTitle = async (req, res) => {
  try {
    const { title, choices ,stepID } = req.body;
    const newHeadTitle = new HeadTitle({ title, choices });
    await newHeadTitle.save();
    const step = await Step.findById(stepID);
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }
    step.heads.push(newHeadTitle._id);
    await step.save();
    res.status(201).json(newHeadTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllHeadTitles = async (req, res) => {
  try {
    const headTitles = await HeadTitle.find().populate('choices');
    res.status(200).json(headTitles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHeadTitleById = async (req, res) => {
  try {
    const { id } = req.params;
    const headTitle = await HeadTitle.findById(id).populate('choices');
    if (!headTitle) {
      return res.status(404).json({ error: 'HeadTitle not found' });
    }
    res.status(200).json(headTitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateHeadTitleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, choices } = req.body;
    const updatedHeadTitle = await HeadTitle.findByIdAndUpdate(id, { title, choices }, { new: true });
    if (!updatedHeadTitle) {
      return res.status(404).json({ error: 'HeadTitle not found' });
    }
    res.status(200).json(updatedHeadTitle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteHeadTitleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { stepID } = req.body;

    const deletedHeadTitle = await HeadTitle.findByIdAndDelete(id);
    if (!deletedHeadTitle) {
      return res.status(404).json({ error: 'HeadTitle not found' });
    }

    const step = await Step.findById(stepID); 
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }

    step.heads.pull(id);
    await step.save();

    res.status(200).json({ message: 'HeadTitle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};