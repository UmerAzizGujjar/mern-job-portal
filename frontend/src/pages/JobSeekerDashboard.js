import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    accepted: 0,
    rejected: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/applications/my-applications');
      const applications = response.data.data;
      
      setRecentApplications(applications.slice(0, 5));
      
      const statsData = {
        total: applications.length,
        pending: applications.filter(app => app.status === 'pending').length,
        reviewed: applications.filter(app => app.status === 'reviewed').length,
        shortlisted: applications.filter(app => app.status === 'shortlisted').length,
        accepted: applications.filter(app => app.status === 'accepted').length,
        rejected: applications.filter(app => app.status === 'rejected').length
      };
      
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Welcome back, {user?.name}!</h2>
          <p style={{ color: '#7f8c8d' }}>Track your job applications and find new opportunities</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{stats.shortlisted}</h3>
            <p>Shortlisted</p>
          </div>
          <div className="stat-card">
            <h3>{stats.accepted}</h3>
            <p>Accepted</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <Link to="/jobs" className="btn btn-primary">
            Browse Jobs
          </Link>
          <Link to="/jobseeker/applications" className="btn btn-secondary">
            View All Applications
          </Link>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>Recent Applications</h3>
          
          {recentApplications.length === 0 ? (
            <div className="empty-state">
              <p>You haven't applied to any jobs yet</p>
              <Link to="/jobs" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Start Browsing Jobs
              </Link>
            </div>
          ) : (
            <div className="job-list">
              {recentApplications.map((application) => (
                <div key={application._id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h4>{application.jobId?.title}</h4>
                      <p style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>
                        {application.jobId?.company}
                      </p>
                      <div className="job-meta" style={{ marginTop: '0.5rem' }}>
                        <span>📍 {application.jobId?.location}</span>
                        <span>💼 {application.jobId?.jobType}</span>
                      </div>
                      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`badge badge-${application.status}`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
