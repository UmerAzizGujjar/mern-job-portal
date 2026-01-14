import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
    phone: '',
    companyName: '',
    companyDescription: '',
    website: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      if (formData.role === 'employer') {
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
      <div className="form-container" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            🚀
          </div>
          <h2 style={{ 
            fontSize: '1.875rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Create Account</h2>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Join us and start your journey</p>
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
            <label>👤 I am a</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          <div className="form-group">
            <label>✨ Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <label>📱 Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>🔒 Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>🔐 Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {formData.role === 'employer' && (
            <>
              <div className="form-group">
                <label>🏢 Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>📝 Company Description</label>
                <textarea
                  name="companyDescription"
                  placeholder="Tell us about your company"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>🌐 Website</label>
                <input
                  type="url"
                  name="website"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-success" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? '🔄 Creating Account...' : '🎉 Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6B7280' }}>
          Already have an account? <Link to="/login" style={{ color: '#10B981', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
