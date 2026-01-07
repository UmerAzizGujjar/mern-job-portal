import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs/employer/my-jobs');
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job? All applications will be removed.')) {
      try {
        await api.delete(`/jobs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (error) {
        alert('Failed to delete job');
      }
    }
  };

  const handleToggleStatus = async (job) => {
    try {
      const newStatus = job.status === 'active' ? 'closed' : 'active';
      await api.put(`/jobs/${job._id}`, { status: newStatus });
      setJobs(jobs.map(j => j._id === job._id ? { ...j, status: newStatus } : j));
    } catch (error) {
      alert('Failed to update job status');
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Manage Jobs</h2>
          <Link to="/employer/post-job" className="btn btn-success">
            + Post New Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs posted yet</h3>
            <p>Start by posting your first job</p>
            <Link to="/employer/post-job" className="btn btn-success" style={{ marginTop: '1rem' }}>
              Post a Job
            </Link>
          </div>
        ) : (
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{job.title}</h3>
                    <p style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>{job.company}</p>
                    
                    <div className="job-meta" style={{ marginTop: '0.5rem' }}>
                      <span>📍 {job.location}</span>
                      <span>💼 {job.jobType}</span>
                      <span>📊 {job.experienceLevel}</span>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <span className={`badge badge-${job.status}`}>{job.status}</span>
                      <span style={{ marginLeft: '0.5rem', color: '#7f8c8d' }}>
                        {job.applicationsCount} applications
                      </span>
                    </div>

                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link to={`/employer/jobs/${job._id}`} className="btn btn-primary">
                      View & Edit
                    </Link>
                    <Link to={`/employer/jobs/${job._id}/applications`} className="btn btn-secondary">
                      View Applications ({job.applicationsCount})
                    </Link>
                    <button 
                      onClick={() => handleToggleStatus(job)}
                      className={`btn ${job.status === 'active' ? 'btn-secondary' : 'btn-success'}`}
                    >
                      {job.status === 'active' ? 'Close Job' : 'Reopen Job'}
                    </button>
                    <button 
                      onClick={() => handleDelete(job._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
