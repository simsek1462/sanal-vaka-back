const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');
const config = require('../config/config');

let refreshTokens = [];

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = new User({ email, password, role });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('role');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role.name }, config.secret, { expiresIn: config.tokenLife });
    const refreshToken = jwt.sign({ id: user._id, role: user.role.name }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });

    refreshTokens.push(refreshToken);

    res.json({ token, refreshToken, user });
  } catch (error) {

    res.status(500).json({ error: 'Error logging in' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, config.refreshTokenSecret, async (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid refresh token' });
    const role = await Role.findById(user.role)
    const newToken = jwt.sign({ id: user.id, role: role.name }, config.secret, { expiresIn: config.tokenLife });
    const newRefreshToken = jwt.sign({ id: user.id, role: role.name }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    refreshTokens.push(newRefreshToken);

    res.json({ token: newToken, refreshToken: newRefreshToken });
  });
};

exports.verifyTokens = (req, res) => {
  const { token, refreshToken } = req.body;


  if (!token && !refreshToken) {
    return res.status(400).json({ message: 'Token and refresh token are required' });
  }

  try {
    if (token) {


      const decodedToken = jwt.verify(token, config.secret);
      return res.status(200).json({ message: 'Tokens are valid', payload: decodedToken });
    }
    if (refreshToken) {

      const decodedRefreshToken = jwt.verify(refreshToken, config.refreshTokenSecret);

      return res.status(200).json({ message: 'DecodedRefreshToken are valid', payload: decodedRefreshToken });
    }

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token or refresh token', error: error.message });
  }
};