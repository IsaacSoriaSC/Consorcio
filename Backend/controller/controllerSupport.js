const express = require('express');
const router = express.Router();
const Support = require('../models/modelSupport');

// GET /api/supports - Obtener todos los supports
router.get('/api/supports', (req, res) => {
  Support.find({})
    .then(supports => {
      res.json(supports);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/supports - Crear un nuevo support
router.post('/api/supports', (req, res) => {
  const support = new Support(req.body);
  support.save()
    .then(newSupport => {
      res.status(201).json(newSupport);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// PUT /api/supports/:id - Actualizar un support por su ID
router.put('/api/supports/:id', (req, res) => {
  const { id } = req.params;
  Support.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedSupport => {
      if (!updatedSupport) {
        return res.status(404).json({ error: 'Soporte no encontrado' });
      }
      res.json(updatedSupport);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// DELETE /api/supports/:id - Eliminar un support por su ID
router.delete('/api/supports/:id', (req, res) => {
  const { id } = req.params;
  Support.findByIdAndDelete(id)
    .then(deletedSupport => {
      if (!deletedSupport) {
        return res.status(404).json({ error: 'Soporte no encontrado' });
      }
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = router;
