import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData.role === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/jobseeker/dashboard');
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            🔐
          </div>
          <h2 style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Welcome Back!</h2>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Login to access your account</p>
        </div>
        
        {error && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#DC2626',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>📧 Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>🔒 Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? '🔄 Logging in...' : '✨ Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6B7280' }}>
          Don't have an account? <Link to="/register" style={{ color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
