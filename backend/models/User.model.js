const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name:   { type: String, required: true },
  email:  { type: String, required: true },
  password: { type: String, required: true },
  role:   { type: String, enum: ['General User', 'Admin'], default: 'General User' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);