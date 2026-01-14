import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }} onClick={closeMobileMenu}>
            <h1>Job Portal</h1>
          </Link>
          
          {/* Hamburger Menu Button */}
          <button 
            className="hamburger-menu"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <Link to="/jobs" onClick={closeMobileMenu}>Browse Jobs</Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'}
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <span style={{ color: 'white' }}>Welcome, {user?.name}</span>
                <button onClick={() => { logout(); closeMobileMenu(); }} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>Login</Link>
                <Link to="/register" onClick={closeMobileMenu}>
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
