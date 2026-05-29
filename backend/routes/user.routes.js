const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const verifyToken = require('../middleware/auth.middleware');

// Admin only guard
function adminOnly(req, res, next) {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Admins only' });
  next();
}

// GET /api/users
router.get('/', verifyToken, adminOnly, async (req, res) => {
  const delay = parseInt(req.query.delay) || 0;
  await new Promise(resolve => setTimeout(resolve, delay));

  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users
router.post('/', verifyToken, adminOnly, async (req, res) => {
  const { userId, name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ userId });
    if (exists) return res.status(400).json({ message: 'User ID already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ userId, name, email, password: hashed, role });
    await newUser.save();
    res.status(201).json({ message: 'User created', user: { userId, name, email, role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    await User.findOneAndDelete({ userId: req.params.id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
