const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // changed from username to name
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // added phone number
    role: { type: String, default: 'customer' },
    deliveryAddresses: [{ type: String }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;