/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/login/SignIn'; // Ajusta la ruta según la ubicación real de tu componente SignIn
import SignUp from './pages/signUp/SignUp';
import { Toaster, toast } from 'sonner'


function App() {
  return (
    
    <Router>
      <Toaster expand={true} />
      <div className="App">
        <Routes>
          <Route path="/login" element={<SignIn/>} />
          <Route path="/register" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
