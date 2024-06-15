import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreateURL from './components/CreateURL';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<ProtectedRoute><CreateURL /></ProtectedRoute>} /> {/* Use ProtectedRoute */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  </Router>
);

export default App;
