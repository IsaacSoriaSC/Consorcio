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
import { Toaster, toast } from 'sonner'; // Importa Toaster y toast

const defaultTheme = createTheme();

export default function PropertyForm() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [images, setImages] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const property = {
      title,
      description,
      price: parseFloat(price),
      location,
      images: images.split(',').map(url => url.trim()) // Convierte la entrada en un array de URLs
    };

    try {
      await PropertyService.create(property);
      toast.success('Propiedad creada exitosamente'); // Mostrar toast de éxito
      // Limpiar campos
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
      setImages('');
      navigate('/dashboard'); // Ajusta esta ruta según tu aplicación
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Error creando la propiedad. Por favor, verifique los campos.'); // Mostrar toast de error
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
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Propiedad
          </Typography>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Ubicación"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="images"
                  label="URLs de Imágenes (separadas por comas)"
                  name="images"
                  helperText="Ingrese las URLs de las imágenes separadas por comas"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
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
          </Box>
        </Box>      
      </Container>
    </ThemeProvider>
  );
}
