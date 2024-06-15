import React, { useState } from 'react';
import api from '../services/api';

const HealthCheck = () => {
  const [status, setStatus] = useState(null);

  const checkHealth = async () => {
    try {
      const res = await api.get('/health');
      setStatus(res.data.status);
    } catch (error) {
      setStatus('unhealthy');
    }
  };

  return (
    <div>
      <button onClick={checkHealth}>Check Health</button>
      {status && <p>Status: {status}</p>}
    </div>
  );
};

export default HealthCheck;
