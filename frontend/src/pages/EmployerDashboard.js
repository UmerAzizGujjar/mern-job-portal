import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [jobsResponse, applicationsResponse] = await Promise.all([
        api.get('/jobs/employer/my-jobs'),
        api.get('/applications/employer/all')
      ]);

      const jobs = jobsResponse.data.data;
      const applications = applicationsResponse.data.data;

      setRecentJobs(jobs.slice(0, 5));
      setRecentApplications(applications.slice(0, 5));

      setStats({
        totalJobs: jobs.length,
        activeJobs: jobs.filter(job => job.status === 'active').length,
        totalApplications: applications.length,
        pendingApplications: applications.filter(app => app.status === 'pending').length
      });
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
          <p style={{ color: '#7f8c8d' }}>{user?.companyName}</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>{stats.totalJobs}</h3>
            <p>Total Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{stats.activeJobs}</h3>
            <p>Active Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalApplications}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>{stats.pendingApplications}</h3>
            <p>Pending Review</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <Link to="/employer/post-job" className="btn btn-success">
            + Post New Job
          </Link>
          <Link to="/employer/jobs" className="btn btn-primary">
            Manage Jobs
          </Link>
          <Link to="/employer/applications" className="btn btn-secondary">
            View All Applications
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Recent Jobs</h3>
            
            {recentJobs.length === 0 ? (
              <div className="empty-state">
                <p>You haven't posted any jobs yet</p>
                <Link to="/employer/post-job" className="btn btn-success" style={{ marginTop: '1rem' }}>
                  Post Your First Job
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentJobs.map((job) => (
                  <div key={job._id} style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h4>{job.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                          {job.location} • {job.jobType}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                          {job.applicationsCount} applications
                        </p>
                      </div>
                      <span className={`badge badge-${job.status}`}>{job.status}</span>
                    </div>
                    <Link 
                      to={`/employer/jobs/${job._id}`} 
                      className="btn btn-primary"
                      style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Recent Applications</h3>
            
            {recentApplications.length === 0 ? (
              <div className="empty-state">
                <p>No applications received yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recentApplications.map((application) => (
                  <div key={application._id} style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h4>{application.jobSeekerId?.name}</h4>
                        <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                          Applied for: {application.jobId?.title}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`badge badge-${application.status}`}>{application.status}</span>
                    </div>
                    <Link 
                      to={`/employer/applications/${application._id}`} 
                      className="btn btn-primary"
                      style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}
                    >
                      Review
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
