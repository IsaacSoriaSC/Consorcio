/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, TextField, Button, Grid, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import RegisterService from '../services/RegisterService';
import UserService from '../services/UserService'; // Asumimos que crearás este servicio
import { Toaster, toast } from 'sonner'; // Importa Toaster y toast

export default function ManageVendors() {
  const [vendors, setVendors] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await UserService.getByRole('vendedor');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleAddVendor = async () => {
    try {
      const vendorData = {
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: 'vendedor'
      };
      await RegisterService.create(vendorData);
      setOpenAddDialog(false);
      fetchVendors();
      toast.success('Vendedor añadido exitosamente'); // Mostrar toast de éxito
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast.error('Error añadiendo vendedor. Por favor, inténtelo de nuevo.'); // Mostrar toast de error
    }
  };

  const handleEditVendor = async () => {
    try {
      await UserService.update(selectedVendor._id, formData);
      setOpenEditDialog(false);
      fetchVendors();
      toast.success('Vendedor editado exitosamente'); // Mostrar toast de éxito
    } catch (error) {
      console.error('Error editing vendor:', error);
      toast.error('Error editando vendedor. Por favor, inténtelo de nuevo.'); // Mostrar toast de error
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await UserService.update(id, { active: !currentStatus });
      fetchVendors();
      toast.success(`Vendedor ${currentStatus ? 'desactivado' : 'activado'} exitosamente`); // Mostrar toast de éxito
    } catch (error) {
      console.error('Error toggling vendor status:', error);
      toast.error('Error cambiando el estado del vendedor. Por favor, inténtelo de nuevo.'); // Mostrar toast de error
    }
  };

  return (
    <Container>
      <Toaster richColors /> {/* Renderizar Toaster con colores ricos */}
      <Typography variant="h4" gutterBottom>
        Gestionar Vendedores
      </Typography>
      <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
        Añadir Vendedor
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor._id}>
                <TableCell>{vendor.username}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.active ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>
                  <Button onClick={() => {
                    setSelectedVendor(vendor);
                    setFormData({
                      firstName: vendor.username.split(' ')[0],
                      lastName: vendor.username.split(' ')[1] || '',
                      email: vendor.email
                    });
                    setOpenEditDialog(true);
                  }}>
                    Editar
                  </Button>
                  <Button onClick={() => handleToggleActive(vendor._id, vendor.active)}>
                    {vendor.active ? 'Desactivar' : 'Activar'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para añadir vendedor */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Añadir Vendedor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Apellido"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
          <Button onClick={handleAddVendor}>Añadir</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar vendedor */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Vendedor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Apellido"
            type="text"
            fullWidth
            variant="standard"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button onClick={handleEditVendor}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
