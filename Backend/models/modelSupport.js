const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issue: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed', 'pending'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date }
});

module.exports = mongoose.model('Support', supportSchema);
