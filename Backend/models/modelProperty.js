const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propCode: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [String],
    email: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

// Función para generar letras aleatorias
const generateRandomLetters = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Función para generar números aleatorios
const generateRandomNumbers = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10).toString();
    }
    return result;
};

// Función para generar el código de propiedad
propertySchema.statics.generatePropCode = async function() {
    let propCode;
    do {
        const letters = generateRandomLetters(3);
        const numbers = generateRandomNumbers(3);
        propCode = `${letters}-${numbers}`;
    } while (await this.findOne({ propCode })); // Verifica si el código ya existe

    return propCode;
};

module.exports = mongoose.model('Property', propertySchema);
