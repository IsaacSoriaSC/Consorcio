/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DescriptionIcon from '@mui/icons-material/Description';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProformaService from '../services/ProformaService'; // Ajusta la ruta según la ubicación real de tu servicio
import { useNavigate } from 'react-router-dom';

function ManageProformas() {
  const [searchEmail, setSearchEmail] = React.useState('');
  const [proformas, setProformas] = React.useState([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [confirmStatusOpen, setConfirmStatusOpen] = React.useState(false);
  const [selectedProforma, setSelectedProforma] = React.useState(null);
  const [status, setStatus] = React.useState('pending');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchEmail(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await ProformaService.getByClientEmail(searchEmail);
      setProformas(response);
    } catch (error) {
      console.error('Error searching proformas:', error);
      setError('Error searching proformas. Please try again.');
    }
  };

  const handleEdit = (proforma) => {
    setSelectedProforma(proforma);
    setEditOpen(true);
  };

  const handleDelete = (proforma) => {
    setSelectedProforma(proforma);
    setDeleteOpen(true);
  };

  const handleConfirmStatusChange = (proforma) => {
    setSelectedProforma(proforma);
    setConfirmStatusOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedProforma(null);
  };

  const handleCloseDelete = async () => {
    if (selectedProforma) {
      try {
        await ProformaService.remove(selectedProforma._id);
        setProformas(proformas.filter(p => p._id !== selectedProforma._id));
        setSelectedProforma(null);
        setDeleteOpen(false);
      } catch (error) {
        console.error('Error deleting proforma:', error);
        setError('Error deleting proforma. Please try again.');
      }
    }
  };

  const handleCloseConfirmStatus = async () => {
    if (selectedProforma) {
      const updatedProforma = {
        ...selectedProforma,
        status: status,
      };

      try {
        await ProformaService.update(selectedProforma._id, updatedProforma);
        const updatedProformas = proformas.map(p =>
          p._id === selectedProforma._id ? updatedProforma : p
        );
        setProformas(updatedProformas);
        setConfirmStatusOpen(false);
        setEditOpen(false);
        setSelectedProforma(null);
        setStatus('pending');
      } catch (error) {
        console.error('Error updating proforma:', error);
        setError('Error updating proforma. Please try again.');
      }
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdate = async () => {
    if (selectedProforma) {
      const updatedProforma = {
        clientEmail: selectedProforma.clientEmail,
        propertyTitle: selectedProforma.propertyTitle,
        totalAmount: selectedProforma.totalAmount,
        details: selectedProforma.details,
        status: status
      };

      try {
        const response = await ProformaService.update(selectedProforma._id, updatedProforma);
        const updatedProformas = proformas.map(p => (p._id === response._id ? response : p));
        setProformas(updatedProformas);
        setEditOpen(false);
        setSelectedProforma(null);
        setStatus('pending');
      } catch (error) {
        console.error('Error updating proforma:', error);
        setError('Error updating proforma. Please try again.');
      }
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <DescriptionIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Gestionar Proformas
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="searchEmail"
                  label="Correo Electrónico del Cliente"
                  name="searchEmail"
                  autoComplete="email"
                  value={searchEmail}
                  onChange={handleChange}
                  sx={{ width: '100%' }} // Ajustar la longitud del campo de correo electrónico
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Título de la Propiedad</TableCell>
                        <TableCell>Monto Total</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {proformas.map((proforma) => (
                        <TableRow key={proforma._id}>
                          <TableCell>{proforma.propertyTitle}</TableCell>
                          <TableCell>{proforma.totalAmount}</TableCell>
                          <TableCell>{proforma.status}</TableCell>
                          <TableCell>
                            {proforma.status === 'Pendiente' && (
                              <>
                                <Button onClick={() => handleEdit(proforma)}>Editar</Button>
                                <Button onClick={() => handleDelete(proforma)}>Eliminar</Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleCloseEdit}>
        <DialogTitle>Editar Proforma</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              id="clientEmail"
              label="Correo Electrónico del Cliente"
              name="clientEmail"
              autoComplete="email"
              value={selectedProforma ? selectedProforma.clientEmail : ''}
              disabled
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              id="propertyTitle"
              label="Título de la Propiedad"
              name="propertyTitle"
              autoComplete="property-title"
              value={selectedProforma ? selectedProforma.propertyTitle : ''}
              disabled
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              id="totalAmount"
              label="Monto Total"
              name="totalAmount"
              type="number"
              autoComplete="total-amount"
              value={selectedProforma ? selectedProforma.totalAmount : ''}
              onChange={(e) =>
                setSelectedProforma({ ...selectedProforma, totalAmount: parseFloat(e.target.value) })
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Estado</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                label="Estado"
                onChange={handleStatusChange}
                required
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="Aprobado">Aprobado</MenuItem>
                <MenuItem value="Rechazado">Rechazado</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button onClick={() => handleConfirmStatusChange(selectedProforma)} color="primary">Actualizar</Button>
        </DialogActions>
      </Dialog>

      {/* Status Confirmation Dialog */}
      <Dialog open={confirmStatusOpen} onClose={() => setConfirmStatusOpen(false)}>
        <DialogTitle>Confirmar Cambio de Estado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea cambiar el estado a "{status}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmStatusOpen(false)}>Cancelar</Button>
          <Button onClick={handleCloseConfirmStatus} color="primary">Confirmar</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea eliminar esta proforma?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
          <Button onClick={handleCloseDelete} color="primary" autoFocus>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default ManageProformas;
