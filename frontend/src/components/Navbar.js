import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>Job Portal</h1>
          </Link>
          
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Browse Jobs</Link>
            
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'}>
                  Dashboard
                </Link>
                <span style={{ color: 'white' }}>Welcome, {user?.name}</span>
                <button onClick={logout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">
                  <button className="btn btn-primary">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
