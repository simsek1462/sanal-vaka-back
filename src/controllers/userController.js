const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { email, name, surname, department, isVerified, password, role } = req.body;
    const user = new User({ email, name, surname, department, isVerified, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('department').populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
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
    const user = await User.findById(userId)
      .populate('department')
      .populate('role')
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    delete user.password;

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, name, surname, department, isVerified, password, role } = req.body;
    const updatedFields = { email, name, surname, department, isVerified, role };

    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
