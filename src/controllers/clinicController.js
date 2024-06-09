const Clinic = require('../models/clinic'); 

exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find().populate('departments');
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id).populate('departments');
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createClinic = async (req, res) => {
  const clinic = new Clinic(req.body);
  try {
    const newClinic = await clinic.save();
    res.status(201).json(newClinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.status(200).json(clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.status(200).json({ message: 'Clinic deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
