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
import { useNavigate } from 'react-router-dom';
import ProformaService from '../services/ProformaService';
import PropertyService from '../services/PropertyService';
import { Toaster, toast } from 'sonner'; // Importa Toaster y toast

const defaultTheme = createTheme();

export default function ProformaForm() {
  const [status, setStatus] = React.useState('Pendiente');
  const [clientEmail, setClientEmail] = React.useState('');
  const [propertyCode, setPropertyCode] = React.useState('');
  const [propertyDetails, setPropertyDetails] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClientEmailChange = (event) => {
    setClientEmail(event.target.value);
  };

  const handlePropertyCodeChange = (event) => {
    setPropertyCode(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await PropertyService.getByCode(propertyCode);
      setPropertyDetails(response.data);
    } catch (error) {
      toast.error('No se ha encontrado el código de propiedad'); // Mostrar toast de error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!propertyDetails) {
      toast.error('Please search for a property before submitting.'); // Mostrar toast de error
      return;
    }

    const proforma = {
      clientEmail,
      propertyTitle: propertyDetails.title,
      totalAmount: propertyDetails.price,
      details: propertyDetails.description,
      status
    };

    try {
      const response = await ProformaService.create(proforma);
      console.log('Proforma created successfully');
      toast.success('Proforma generada exitosamente'); // Mostrar toast de éxito en verde

      // Limpiar campos
      setClientEmail('');
      setPropertyCode('');
      setPropertyDetails(null);
      setStatus('Pendiente');
    } catch (error) {
      console.error('Error creating proforma:', error);
      toast.error('Error creating proforma. Please try again.'); // Mostrar toast de error
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster richColors /> {/* Renderizar Toaster con colores ricos */}
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
            Crear Proforma
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="clientEmail"
                  label="Correo Electrónico del Cliente"
                  name="clientEmail"
                  autoComplete="email"
                  value={clientEmail}
                  onChange={handleClientEmailChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="propertyCode"
                  label="Código de Propiedad"
                  name="propertyCode"
                  value={propertyCode}
                  onChange={handlePropertyCodeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  disabled={!propertyCode}
                >
                  Buscar
                </Button>
              </Grid>
              {propertyDetails && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="propertyTitle"
                      label="Título de la Propiedad"
                      value={propertyDetails.title}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="totalAmount"
                      label="Monto Total"
                      value={propertyDetails.price}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="details"
                      label="Detalles"
                      value={propertyDetails.description}
                      multiline
                      rows={4}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Estado</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    value={status}
                    label="Estado"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Aprobado">Aprobado</MenuItem>
                    <MenuItem value="Rechazado">Rechazado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!propertyDetails}
            >
              Crear Proforma
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => navigate('/dashboard')}
            >
              Regresar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
