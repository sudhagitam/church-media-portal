import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
      <nav style={{
        background: '#1a237e', padding: '12px 24px',
        display: 'flex', alignItems: 'center', gap: '24px'
      }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
          ✝ Church Media Portal
        </span>
        <Link to="/" style={{ color: '#90caf9', textDecoration: 'none' }}>Gallery</Link>
        <Link to="/upload" style={{ color: '#90caf9', textDecoration: 'none' }}>Upload</Link>
        <Link to="/login" style={{ color: '#90caf9', textDecoration: 'none' }}>Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
