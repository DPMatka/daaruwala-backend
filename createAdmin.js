const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const email = 'admin@daaruwala.com';
  const password = 'admin123'; // This will be your admin password

  const admin = new Admin({
    email: email,
    password: password
  });

  await admin.save();
  console.log('Admin user created!');
  mongoose.disconnect();
}

createAdmin().catch(err => {
  console.error(err);
  mongoose.disconnect();
});