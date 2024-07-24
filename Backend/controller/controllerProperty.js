const express = require('express');
const router = express.Router();
const Property = require('../models/modelProperty');

router.get('/api/properties/:code', (req, res) => {
  const { code } = req.params;
  console.log(`Buscando propiedad con código: ${code}`); // Log para depuración

  Property.findOne({ propCode: code })
    .then(property => {
      if (!property) {
        console.log('Propiedad no encontrada'); // Log para depuración
        return res.status(404).json({ error: 'Property not found' });
      }
      console.log('Propiedad encontrada:', property); // Log para depuración
      res.json(property);
    })
    .catch(error => {
      console.error('Error en la búsqueda de la propiedad:', error); // Log para depuración
      res.status(500).json({ error: error.message });
    });
});


// GET /api/properties - Obtener todas las propiedades
router.get('/api/properties', (req, res) => {
  Property.find({})
    .then(properties => {
      res.json(properties);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/properties - Crear una nueva propiedad
router.post('/api/properties', async (req, res) => {
  try {
    const propCode = await Property.generatePropCode();
    const property = new Property({
      ...req.body,
      propCode
    });
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/properties/:id - Actualizar una propiedad por su ID
router.put('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  // Asegúrate de no permitir la actualización del propCode
  const { propCode, ...updateData } = req.body;
  Property.findByIdAndUpdate(id, updateData, { new: true })
    .then(updatedProperty => {
      if (!updatedProperty) {
        return res.status(404).json({ error: 'Propiedad no encontrada' });
      }
      res.json(updatedProperty);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// DELETE /api/properties/:id - Eliminar una propiedad por su ID
router.delete('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  Property.findByIdAndDelete(id)
    .then(deletedProperty => {
      if (!deletedProperty) {
        return res.status(404).json({ error: 'Propiedad no encontrada' });
      }
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});



module.exports = router;