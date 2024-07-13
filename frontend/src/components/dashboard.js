import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState({
    userId: '',
    email: '',
    role: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        if (token.split('.').length !== 3) {
          throw new Error('Token format is incorrect');
        }
        const decodedToken = jwtDecode(token);
        setUserData({
          userId: decodedToken.userId || '',
          email: decodedToken.email || '',
          role: decodedToken.role || ''
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserData({ email: 'Usuario no identificado' });
        // Opcionalmente, redirigir al usuario al login si el token es inválido
        // navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom>Dashboard</Typography>
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>Información del Usuario</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">ID de Usuario: {userData.userId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Correo Electrónico: {userData.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Rol: {userData.role}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </div>
  );
}

export default Dashboard;