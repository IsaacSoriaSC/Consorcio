/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropertyService from '../services/PropertyService';

const defaultTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(224, 224, 224, 1)',
        },
      },
    },
  },
});

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await PropertyService.getAll();
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Error loading properties. Please try again.');
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShowImages = (images) => {
    setSelectedImages(images);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProperty(null);
  };

  const handleSaveEdit = async () => {
    try {
      await PropertyService.update(selectedProperty._id, selectedProperty);
      fetchProperties();
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating property:', error);
      setError('Error updating property. Please try again.');
    }
  };

  const handleOpenDeleteDialog = (property) => {
    setPropertyToDelete(property);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setPropertyToDelete(null);
  };

  const handleDeleteProperty = async () => {
    try {
      await PropertyService.delete(propertyToDelete._id);
      fetchProperties();
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Error deleting property. Please try again.');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedProperty({ ...selectedProperty, [name]: value });
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2 }}>
          Propiedades Disponibles
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="property table">
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((property) => (
                  <TableRow key={property._id}>
                    <TableCell>{property.propCode}</TableCell>
                    <TableCell>{property.title}</TableCell>
                    <TableCell>{property.description.substring(0, 50)}...</TableCell>
                    <TableCell>${property.price.toLocaleString()}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleShowImages(property.images)}
                        sx={{ mr: 1 }}
                      >
                        Ver Imágenes
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditProperty(property)}
                        sx={{ mr: 1 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleOpenDeleteDialog(property)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={properties.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
          <DialogTitle>Imágenes de la Propiedad</DialogTitle>
          <DialogContent>
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property image ${index + 1}`}
                style={{ maxWidth: '100%', marginBottom: '10px' }}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImageDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Editar Propiedad</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  name="title"
                  value={selectedProperty?.title || ''}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  value={selectedProperty?.description || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  name="price"
                  type="number"
                  value={selectedProperty?.price || ''}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  name="location"
                  value={selectedProperty?.location || ''}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancelar</Button>
            <Button onClick={handleSaveEdit} variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Está seguro de que desea eliminar la propiedad "{propertyToDelete?.title}"?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
            <Button onClick={handleDeleteProperty} variant="contained" color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}