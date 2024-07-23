const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'gerente', 'vendedor', 'cliente'], required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
