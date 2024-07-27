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

// Middleware para parsear JSON y usar los controladores
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/quotes', quoteRouter);
app.use('/api/proformas', proformaRouter);
app.use('/api/reports', reportRouter);
app.use('/api/support', supportRouter);

// Servir archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
