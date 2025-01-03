const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: {type: String,required:true},
  surname: {type:String,required:true},
  department: {type:mongoose.Schema.Types.ObjectId,required:true ,ref: 'Department'},
  isVerified: {type: Boolean,default:false},
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Role' },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
