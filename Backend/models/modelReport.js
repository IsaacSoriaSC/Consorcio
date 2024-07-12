const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: String, required: true }, // Puede ser un JSON stringificado con los datos del reporte
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
