/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from '../../services/AuthService';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email'),
      password: data.get('password')
    };
  
    try {
      const response = await AuthService.login(credentials);
      console.log('Login successful:', response);
      
      const { token } = response;
      if (token && token.split('.').length === 3) {
        localStorage.setItem('token', token);
        
        // Decodificar el token para obtener el rol
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('userRole', decodedToken.role);
        
        navigate('/');
      } else {
        console.error('Token inválido recibido');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Muestra un mensaje de error al usuario
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  });

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Acceder
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvide la contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Registrarse"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
