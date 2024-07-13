import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/login/SignIn'; // Ajusta la ruta según la ubicación real de tu componente SignIn
import SignUp from './pages/signUp/SignUp';
import { Toaster } from 'sonner';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <Toaster expand={true} />
      <div className="App">
        <Routes>
          <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
