const express = require('express');
const router = express.Router();
const Record = require('../models/Record.model');
const verifyToken = require('../middleware/auth.middleware');

// GET /api/records?delay=2000
router.get('/', verifyToken, async (req, res) => {
  const delay = parseInt(req.query.delay) || 0;

  // Artificial delay to showcase async processing
  await new Promise(resolve => setTimeout(resolve, delay));

  try {
    let records;
    if (req.user.role === 'Admin') {
      records = await Record.find({});           // Admin sees all
    } else {
      records = await Record.find({ ownerId: req.user.userId }); // User sees own
    }
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;