const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  ownerId:     { type: String, required: true },  // matches userId
  accessLevel: { type: String, enum: ['public', 'private'], default: 'private' },
  status:      { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);