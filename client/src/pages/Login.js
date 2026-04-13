import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username, password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/upload');
    } catch {
      setError('Invalid username or password');
    }
  }

  return (
    <div style={{
      maxWidth: '400px', margin: '80px auto',
      padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      borderRadius: '12px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>✝ Admin Login</h2>

      {error && (
        <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>
      )}

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '12px',
          borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '16px',
          borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
      />
      <button
        onClick={handleLogin}
        style={{
          width: '100%', padding: '12px',
          background: '#1a237e', color: 'white',
          border: 'none', borderRadius: '6px',
          fontSize: '16px', cursor: 'pointer'
        }}
      >
        Login
      </button>
      <p style={{ textAlign: 'center', marginTop: '16px', color: '#666', fontSize: '13px' }}>
        Username: churchadmin / Password: church2024
      </p>
    </div>
  );
}
