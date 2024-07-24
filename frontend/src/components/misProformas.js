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
  Snackbar,
  Alert,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProformaService from '../services/ProformaService';
import { jwtDecode } from 'jwt-decode';

const defaultTheme = createTheme();

export default function ClientProformas() {
  const [proformas, setProformas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchProformas();
  }, []);

  const fetchProformas = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró token de autenticación');
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const clientEmail = decodedToken.email;

      if (!clientEmail) {
        setError('No se pudo obtener el email del cliente');
        setLoading(false);
        return;
      }

      const response = await ProformaService.getByClientEmail(clientEmail);
      setProformas(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching proformas:', error);
      setError('Error loading proformas. Please try again.');
      setLoading(false);
    }
  };

  const handleDownload = async (proformaId) => {
    try {
      await ProformaService.downloadProformaPDF(proformaId);
      setSnackbar({ open: true, message: 'PDF descargado con éxito', severity: 'success' });
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      setSnackbar({ open: true, message: 'Error al descargar el PDF', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
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
          Mis Proformas
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="proforma table">
            <TableHead>
              <TableRow>
                <TableCell>Propiedad</TableCell>
                <TableCell align="right">Monto Total</TableCell>
                <TableCell>Detalles</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proformas.map((proforma) => (
                <TableRow key={proforma._id}>
                  <TableCell component="th" scope="row">
                    {proforma.propertyTitle}
                  </TableCell>
                  <TableCell align="right">${proforma.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{proforma.details}</TableCell>
                  <TableCell>{proforma.status}</TableCell>
                  <TableCell>{new Date(proforma.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDownload(proforma._id)}
                    >
                      Descargar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}