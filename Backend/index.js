const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const { MONGODB_URI, PORT } = require('./utils/config');
const usersRouter = require('./controller/controllerUser');
const propertiesRouter = require('./controller/controllerProperty');
const proformaRouter = require('./controller/controllerProforma');
const quoteRouter = require('./controller/controllerQuote');
const reportRouter = require('./controller/controllerReport');
const supportRouter = require('./controller/controllerSupport');

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Middleware para parsear JSON y usar el controlador de usuarios
app.use(express.json());
app.use(usersRouter);
app.use(propertiesRouter);
app.use(quoteRouter);
app.use(proformaRouter);
app.use(reportRouter);
app.use(supportRouter);

// Servir archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Manejar cualquier solicitud que no coincida con las rutas definidas anteriormente
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
