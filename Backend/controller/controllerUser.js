const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/modelUser');
const cors = require('cors');

router.use(cors());

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

    // Aquí puedes incluir la lógica para generar un token JWT si decides implementarlo más adelante

    res.status(200).json({ message: 'Login exitoso'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users - Obtener todos los usuarios
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
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
      createdAt: new Date()
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
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
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
