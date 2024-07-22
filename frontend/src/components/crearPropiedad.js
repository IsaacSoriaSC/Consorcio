/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PropertyService from '../services/PropertyService'; // Asegúrate de crear este servicio

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Raccoon City '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function PropertyForm() {
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const property = {
      title: data.get('title'),
      description: data.get('description'),
      price: parseFloat(data.get('price')),
      location: data.get('location'),
      images: data.get('images').split(',').map(url => url.trim()) // Convierte la entrada en un array de URLs
    };

    try {
      const response = await PropertyService.create(property);
      console.log('Property created successfully');
      navigate('/dashboard'); // Ajusta esta ruta según tu aplicación
    } catch (error) {
      console.error('Error creating property:', error);
      setError('Error creating property. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Propiedad
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Título de la Propiedad"
                  name="title"
                  autoComplete="property-title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Descripción"
                  name="description"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Precio"
                  name="price"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Ubicación"
                  name="location"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="images"
                  label="URLs de Imágenes (separadas por comas)"
                  name="images"
                  helperText="Ingrese las URLs de las imágenes separadas por comas"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Crear Propiedad
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}