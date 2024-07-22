const mongoose = require('mongoose');

const proformaSchema = new mongoose.Schema({
    clientEmail: { type: String, required: true },
    propertyTitle: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    details: { type: String, required: true },
    status: { type: String, enum: ['Pendiente', 'Aprobado', 'Rechazado'], default: 'Pendiente' },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Proforma', proformaSchema);
