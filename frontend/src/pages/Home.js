import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container">
      <div style={{ 
        textAlign: 'center', 
        padding: '5rem 0 3rem',
        position: 'relative'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
          borderRadius: '24px',
          padding: '3rem 2rem',
          marginBottom: '3rem',
          border: '1px solid rgba(79, 70, 229, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            fontWeight: '800',
            lineHeight: '1.2'
          }}>
            Find Your Dream Job Today
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6B7280', 
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            fontWeight: '500'
          }}>
            Connect with top employers and discover thousands of opportunities waiting for you
          </p>

          {!isAuthenticated ? (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                🚀 Get Started
              </Link>
              <Link to="/jobs" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                🔍 Browse Jobs
              </Link>
            </div>
          ) : (
            <Link 
              to={user?.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'} 
              className="btn btn-primary" 
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              📊 Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="dashboard-stats" style={{ marginTop: '3rem' }}>
        <div className="stat-card">
          <h3>1000+</h3>
          <p>Active Jobs</p>
        </div>
        <div className="stat-card">
          <h3>500+</h3>
          <p>Companies</p>
        </div>
        <div className="stat-card">
          <h3>5000+</h3>
          <p>Job Seekers</p>
        </div>
        <div className="stat-card">
          <h3>2000+</h3>
          <p>Successful Hires</p>
        </div>
      </div>

      {/* Feature Section */}
      <div style={{ 
        marginTop: '5rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        paddingBottom: '3rem'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #E5E7EB',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
          <h3 style={{ color: '#1F2937', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Post Jobs</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Employers can easily post job openings and find the perfect candidates</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #E5E7EB',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
          <h3 style={{ color: '#1F2937', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Smart Search</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Advanced filters to help you find jobs that match your skills and preferences</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #E5E7EB',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
          <h3 style={{ color: '#1F2937', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Track Applications</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>Monitor your application status and manage your job search efficiently</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
