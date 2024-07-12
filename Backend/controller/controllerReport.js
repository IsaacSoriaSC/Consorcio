const express = require('express');
const router = express.Router();
const Report = require('../models/modelReport');

// GET /api/reports - Obtener todos los reports
router.get('/api/reports', (req, res) => {
  Report.find({})
    .then(reports => {
      res.json(reports);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/reports - Crear un nuevo report
router.post('/api/reports', (req, res) => {
  const report = new Report(req.body);
  report.save()
    .then(newReport => {
      res.status(201).json(newReport);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// PUT /api/reports/:id - Actualizar un report por su ID
router.put('/api/reports/:id', (req, res) => {
  const { id } = req.params;
  Report.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedReport => {
      if (!updatedReport) {
        return res.status(404).json({ error: 'Reporte no encontrado' });
      }
      res.json(updatedReport);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

// DELETE /api/reports/:id - Eliminar un report por su ID
router.delete('/api/reports/:id', (req, res) => {
  const { id } = req.params;
  Report.findByIdAndDelete(id)
    .then(deletedReport => {
      if (!deletedReport) {
        return res.status(404).json({ error: 'Reporte no encontrado' });
      }
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = router;
