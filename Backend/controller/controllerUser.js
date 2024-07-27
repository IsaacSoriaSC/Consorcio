const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/modelUser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('../utils/config'); // Asegúrate de que la ruta sea correcta

router.use(cors());
const JWT_SECRET = config.SECRET_KEY;

if (!JWT_SECRET) {
  console.error('JWT_SECRET no está definido');
  process.exit(1);
} 

// POST /api/login - Autenticación de usuarios (login)
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Crear token JWT
    const token = jwt.sign({
      userId: user._id,
      email: user.email,
      role: user.role
    }, JWT_SECRET, { expiresIn: '1h' });

    // Asegúrate de que el token se está enviando correctamente
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/users - Obtener todos los usuarios (con opción de filtrar por rol)
router.get('/api/users', async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role) {
      query.role = role;
    }
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/:id - Obtener un usuario por su ID
router.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/users - Crear un nuevo usuario
router.post('/api/users', async (req, res) => {
  const { username, password, role, email } = req.body;

  try {
    // Encriptar la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      username,
      passwordHash, // Guardar el hash en la base de datos
      role,
      email,
      createdAt: new Date(),
      active: true // Establecemos el usuario como activo por defecto
      // No incluimos lastLogin aquí
    });

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/users/:id - Actualizar un usuario por su ID
router.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/users/:id - Eliminar un usuario por su ID
router.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
