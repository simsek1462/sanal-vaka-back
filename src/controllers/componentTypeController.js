const ComponentType = require('../models/componentType');

exports.createComponentType = async (req, res) => {
  try {
    const componentType = new ComponentType(req.body);
    await componentType.save();
    res.status(201).json(componentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllComponentTypes = async (req, res) => {
  try {
    const componentTypes = await ComponentType.find();
    res.status(200).json(componentTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getComponentTypeById = async (req, res) => {
  try {
    const componentType = await ComponentType.findById(req.params.id);
    if (!componentType) {
      return res.status(404).json({ error: 'ComponentType not found' });
    }
    res.status(200).json(componentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateComponentType = async (req, res) => {
  try {
    const componentType = await ComponentType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!componentType) {
      return res.status(404).json({ error: 'ComponentType not found' });
    }
    res.status(200).json(componentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteComponentType = async (req, res) => {
  try {
    const componentType = await ComponentType.findByIdAndDelete(req.params.id);
    if (!componentType) {
      return res.status(404).json({ error: 'ComponentType not found' });
    }
    res.status(200).json({ message: 'ComponentType deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
