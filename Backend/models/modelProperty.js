const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propCode: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [String],
    createdAt: { type: Date, default: Date.now }
});

// Función para generar el código de propiedad
propertySchema.statics.generatePropCode = async function() {
    const count = await this.countDocuments();
    const prefix = 'RC'; // RC por Raccoon City
    const code = `${prefix}-${(count + 1).toString().padStart(3, '0')}`;
    return code;
};

module.exports = mongoose.model('Property', propertySchema);