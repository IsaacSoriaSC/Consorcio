const express = require('express');
const router = express.Router();
const Quote = require('../models/modelQuote');

// GET /api/quotes - Obtener todos los quotes
router.get('/api/quotes', (req, res) => {
  Quote.find({})
    .then(quotes => {
      res.json(quotes);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/quotes - Crear un nuevo quote
router.post('/api/quotes', (req, res) => {
  const quote = new Quote(req.body);
  quote.save()
    .then(newQuote => {
      res.status(201).json(newQuote);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// PUT /api/quotes/:id - Actualizar un quote por su ID
router.put('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  Quote.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedQuote => {
      if (!updatedQuote) {
        return res.status(404).json({ error: 'Quote no encontrado' });
      }
      res.json(updatedQuote);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// DELETE /api/quotes/:id - Eliminar un quote por su ID
router.delete('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  Quote.findByIdAndDelete(id)
    .then(deletedQuote => {
      if (!deletedQuote) {
        return res.status(404).json({ error: 'Quote no encontrado' });
      }
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = router;
