import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container">
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '1rem' }}>
          Welcome to Job Portal
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '2rem' }}>
          Find your dream job or hire talented candidates
        </p>

        {!isAuthenticated ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem' }}>
              Get Started
            </Link>
            <Link to="/jobs" className="btn btn-secondary" style={{ fontSize: '1.1rem' }}>
              Browse Jobs
            </Link>
          </div>
        ) : (
          <Link 
            to={user?.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'} 
            className="btn btn-primary" 
            style={{ fontSize: '1.1rem' }}
          >
            Go to Dashboard
          </Link>
        )}
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
          <p>Successful Placements</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
