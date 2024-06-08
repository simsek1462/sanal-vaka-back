const Department = require('../models/department');
const { populate } = require('../models/user');

exports.createDepartment = async (req, res) => {
  try {
    const { name, faculty, testSteps } = req.body;
    const department = new Department({ name, faculty, testSteps });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStepsByDepartmentId = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId).populate('testSteps');
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department.testSteps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate({
        path: 'testSteps',
        populate: [
          { path: 'heads', model: 'HeadTitle' },
          { path: 'questions', model: 'Question' },
          { path: 'type', model: 'ComponentType' }
        ]
      });
    res.status(200).json(departments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate({
        path: 'testSteps',
        populate: [
          { path: 'heads', model: 'HeadTitle' },
          { path: 'questions', model: 'Question' },
          { path: 'type', model: 'ComponentType' }
        ]
      });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateDepartment = async (req, res) => {
  try {
    const { name, faculty, testSteps } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, faculty, testSteps },
      { new: true, runValidators: true }
    );
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
