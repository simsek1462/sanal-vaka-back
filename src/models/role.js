const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
