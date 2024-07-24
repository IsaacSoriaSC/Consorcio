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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

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
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
                      >
                        Mostrar Imágenes
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
        <Dialog open={openDialog} onClose={handleCloseDialog}>
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
            <Button onClick={handleCloseDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
