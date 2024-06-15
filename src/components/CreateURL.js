import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateURL.css';

const CreateURL = () => {
  const [originalURL, setOriginalURL] = useState('');
  const [shortCode, setShortCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/url/shorten', { original_url: originalURL });
      setShortCode(response.data.short_code);
      toast.success('URL shortened successfully');
    } catch (error) {
      console.error('Shorten URL error:', error.response ? error.response.data : error.message);
      toast.error('Failed to shorten URL');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/login');
  };

  return (
    <div className="url-container">
      <div className="header">
        <h2>Create Short URL</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="text"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          placeholder="Enter long URL"
          required
        />
        <button type="submit" className="url-button">Shorten</button>
      </form>
      {shortCode && (
        <div className="short-url-container">
          <h3>Shortened URL</h3>
          <p><a href={`${process.env.REACT_APP_API_URL}/url/${shortCode}`} target="_blank" rel="noopener noreferrer">{`${process.env.REACT_APP_API_URL}/url/${shortCode}`}</a></p>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CreateURL;
