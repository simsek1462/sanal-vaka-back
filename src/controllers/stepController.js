const Department = require('../models/department');
const Step = require('../models/step');

exports.createStep = async (req, res) => {
  try {
    const { title, description, heads, type, departmentId } = req.body;
    const newStep = new Step({ title, description, heads, type });
    await newStep.save();
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    department.testSteps.push(newStep._id);
    await department.save();

    res.status(201).json(newStep);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSteps = async (req, res) => {
  try {
    const steps = await Step.find().populate('heads type');
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStepById = async (req, res) => {
  try {
    const { id } = req.params;
    const step = await Step.findById(id).populate('heads type');
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }
    res.status(200).json(step);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHeadsByStepId = async (req,res) =>{
  try {
    const { id } = req.params;
    const step = await Step.findById(id).populate('heads');
    if (!step) {
      return res.status(404).json({ error: 'Step not found' });
    }
    res.status(200).json(step.heads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateStepById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, heads, type } = req.body;
    const updatedStep = await Step.findByIdAndUpdate(id, { title, description, heads, type }, { new: true });
    if (!updatedStep) {
      return res.status(404).json({ error: 'Step not found' });
    }
    res.status(200).json(updatedStep);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStepById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStep = await Step.findByIdAndDelete(id);
    if (!deletedStep) {
      return res.status(404).json({ error: 'Step not found' });
    }
    res.status(200).json({ message: 'Step deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
