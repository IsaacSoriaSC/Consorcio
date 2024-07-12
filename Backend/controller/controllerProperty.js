const express = require('express');
const router = express.Router();
const Property = require('../models/modelProperty');

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
router.post('/api/properties', (req, res) => {
  const property = new Property(req.body);
  property.save()
    .then(newProperty => {
      res.status(201).json(newProperty);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// PUT /api/properties/:id - Actualizar una propiedad por su ID
router.put('/api/properties/:id', (req, res) => {
  const { id } = req.params;
  Property.findByIdAndUpdate(id, req.body, { new: true })
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
