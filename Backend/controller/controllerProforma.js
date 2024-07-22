const express = require('express');
const router = express.Router();
const Proforma = require('../models/modelProforma');

// GET /api/proformas - Obtener todas las proformas
router.get('/api/proformas', (req, res) => {
  Proforma.find({})
    .then(proformas => {
      res.json(proformas);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// GET /api/proformas/byEmail - Obtener proformas por correo electrónico del cliente
router.get('/api/proformas/byEmail', (req, res) => {
  const { clientEmail } = req.query;
  if (!clientEmail) {
    return res.status(400).json({ error: 'Se requiere el correo electrónico del cliente' });
  }
  
  // Usamos una expresión regular para hacer la búsqueda insensible a mayúsculas y minúsculas
  const emailRegex = new RegExp('^' + clientEmail + '$', 'i');
  
  Proforma.find({ clientEmail: emailRegex })
    .then(proformas => {
      res.json(proformas);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/proformas - Crear una nueva proforma
router.post('/api/proformas', (req, res) => {
  const proforma = new Proforma(req.body);
  proforma.save()
    .then(newProforma => {
      res.status(201).json(newProforma);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// PUT /api/proformas/:id - Actualizar una proforma por su ID
router.put('/api/proformas/:id', (req, res) => {
  const { id } = req.params;
  Proforma.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedProforma => {
      if (!updatedProforma) {
        return res.status(404).json({ error: 'Proforma no encontrada' });
      }
      res.json(updatedProforma);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// DELETE /api/proformas/:id - Eliminar una proforma por su ID
router.delete('/api/proformas/:id', (req, res) => {
  const { id } = req.params;
  Proforma.findByIdAndDelete(id)
    .then(deletedProforma => {
      if (!deletedProforma) {
        return res.status(404).json({ error: 'Proforma no encontrada' });
      }
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = router;
