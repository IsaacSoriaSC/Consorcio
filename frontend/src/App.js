// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/login/SignIn';
import SignUp from './pages/signUp/SignUp';
import { Toaster } from 'sonner';
import Layout from './components/layout';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <Router>
      <Toaster expand={true} />
      <div className="App">
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<Layout />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;