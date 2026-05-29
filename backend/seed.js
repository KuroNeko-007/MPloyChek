const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User.model');
const Record = require('./models/Record.model');

const users = [
  {
    userId: 'admin01',
    name: 'Gowtham G',
    email: 'Gowtham@app.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'Admin'
  },
  {
    userId: 'user01',
    name: 'Aadit',
    email: 'aadit@app.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'General User'
  },
  {
    userId: 'user02',
    name: 'Kamal',
    email: 'kamal@app.com',
    password: bcrypt.hashSync('user123', 10),
    role: 'General User'
  },
    {
    userId: 'user03',
    name: 'ShriRam',
    email: 'ram@app.com',
    password: bcrypt.hashSync('user12345', 10),
    role: 'General User'
  }
];

const records = [
  { title: 'Project Alpha',   description: 'Internal project docs',   ownerId: 'user01', accessLevel: 'private' },
  { title: 'Project Beta',    description: 'Beta release plan',        ownerId: 'user01', accessLevel: 'public'  },
  { title: 'Budget Report',   description: 'Q1 financials',           ownerId: 'user02', accessLevel: 'private' },
  { title: 'Team Roster',     description: 'All team members list',   ownerId: 'user02', accessLevel: 'public'  },
  { title: 'System Audit',    description: 'Admin audit log',         ownerId: 'admin01', accessLevel: 'private' },
  { title: 'Global Config',   description: 'App-wide configuration',  ownerId: 'admin01', accessLevel: 'public'  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await User.deleteMany({});
    await Record.deleteMany({});
    await User.insertMany(users);
    await Record.insertMany(records);
    console.log('Seed complete');
    process.exit();
  })
  .catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
  });