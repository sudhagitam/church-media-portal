import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [file, setFile]         = useState(null);
  const [category, setCategory] = useState('Sermons');
  const [progress, setProgress] = useState(0);
  const [status, setStatus]     = useState('');
  const navigate = useNavigate();

  async function handleUpload() {
    if (!file) return alert('Please select a video file');
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('category', category);

    try {
      setStatus('uploading');
      await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: e => setProgress(Math.round((e.loaded * 100) / e.total))
      });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      alert(err.response?.data?.error || 'Upload failed');
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '32px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
      <h2>📤 Upload Sermon Video</h2>

      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Category
      </label>
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px',
          borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option>Sermons</option>
        <option>Worship</option>
        <option>Events</option>
        <option>Seven Last Words</option>
      </select>

      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Select Video File
      </label>
      <input
        type="file" accept="video/*"
        onChange={e => setFile(e.target.files[0])}
        style={{ marginBottom: '16px' }}
      />

      {file && (
        <p style={{ color: '#555', marginBottom: '12px' }}>
          📁 {file.name} — {(file.size / 1024 / 1024).toFixed(1)} MB
        </p>
      )}

      {status === 'uploading' && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ background: '#eee', borderRadius: '4px', height: '10px' }}>
            <div style={{
              background: '#1a237e', height: '10px', borderRadius: '4px',
              width: `${progress}%`, transition: 'width 0.3s'
            }}/>
          </div>
          <p style={{ marginTop: '6px', color: '#555' }}>{progress}% uploaded...</p>
        </div>
      )}

      {status === 'done' && (
        <div style={{ background: '#e8f5e9', padding: '12px',
          borderRadius: '8px', marginBottom: '16px' }}>
          <p style={{ color: 'green', margin: 0 }}>
            ✅ Video uploaded to Google Drive successfully!
          </p>
          <button
            onClick={() => navigate('/')}
            style={{ marginTop: '8px', background: 'none',
              border: 'none', color: '#1a237e', cursor: 'pointer' }}
          >
            View in Gallery →
          </button>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={status === 'uploading'}
        style={{
          width: '100%', padding: '12px',
          background: status === 'uploading' ? '#ccc' : '#1a237e',
          color: 'white', border: 'none',
          borderRadius: '6px', fontSize: '16px', cursor: 'pointer'
        }}
      >
        {status === 'uploading' ? `Uploading... ${progress}%` : '⬆ Upload to Google Drive'}
      </button>
    </div>
  );
}
