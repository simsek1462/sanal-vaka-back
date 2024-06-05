const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

let refreshTokens = []; 

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username,password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id,role:user.role }, config.secret, { expiresIn: config.tokenLife });
    const refreshToken = jwt.sign({ id: user._id,role:user.role }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });

    refreshTokens.push(refreshToken);

    res.json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid refresh token' });

    const newToken = jwt.sign({ id: user.id, role:user.role }, config.secret, { expiresIn: config.tokenLife });
    const newRefreshToken = jwt.sign({ id: user.id , role:user.role }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });

    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    refreshTokens.push(newRefreshToken);

    res.json({ token: newToken, refreshToken: newRefreshToken });
  });
};
exports.verifyTokens = (req, res) => {
  const { token, refreshToken } = req.body;

  if (!token || !refreshToken) {
    return res.status(400).json({ message: 'Token and refresh token are required' });
  }

  try {
    const decodedToken = jwt.verify(token, config.secret);
    console.log('Decoded Access Token:', decodedToken);

    const decodedRefreshToken = jwt.verify(refreshToken, config.refreshTokenSecret);
    console.log('Decoded Refresh Token:', decodedRefreshToken);

    return res.status(200).json({ message: 'Tokens are valid',payload: decodedToken.payload });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token or refresh token', error: error.message });
  }
};