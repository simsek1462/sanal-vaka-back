const Scenario = require('../models/scenario');

exports.createScenario = async (req, res) => {
    try {
        const scenario = new Scenario(req.body);
        await scenario.save();
        res.status(201).json(scenario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getScenarios = async (req, res) => {
    try {
        const scenarios = await Scenario.find().populate('department clinic multipleChoiceAnwsers questions.questionId');
        res.status(200).json(scenarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getScenariosByClinicId = async (req, res) => {
    try {
      const { clinicId } = req.params;
      const scenarios = await Scenario.find({ clinic: clinicId })
      
      if (scenarios.length === 0) {
        return res.status(404).json({ error: 'No scenarios found for this clinic' });
      }
  
      res.status(200).json(scenarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getScenarioById = async (req, res) => {
    try {
        const scenario = await Scenario.findById(req.params.id).populate('department clinic multipleChoiceAnwsers questions.questionId');
        if (!scenario) {
            return res.status(404).json({ error: 'Scenario not found' });
        }
        res.status(200).json(scenario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateScenario = async (req, res) => {
    try {
        const scenario = await Scenario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!scenario) {
            return res.status(404).json({ error: 'Scenario not found' });
        }
        res.status(200).json(scenario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.deleteScenario = async (req, res) => {
    try {
        const scenario = await Scenario.findByIdAndDelete(req.params.id);
        if (!scenario) {
            return res.status(404).json({ error: 'Scenario not found' });
        }
        res.status(200).json({ message: 'Scenario deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
