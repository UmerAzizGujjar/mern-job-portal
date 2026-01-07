import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/my-applications');
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        await api.delete(`/applications/${id}`);
        setApplications(applications.filter(app => app._id !== id));
      } catch (error) {
        alert('Failed to withdraw application');
      }
    }
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>My Applications</h2>
          <Link to="/jobs" className="btn btn-primary">
            Browse More Jobs
          </Link>
        </div>

        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setFilter('all')} 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All ({applications.length})
          </button>
          <button 
            onClick={() => setFilter('pending')} 
            className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Pending ({applications.filter(a => a.status === 'pending').length})
          </button>
          <button 
            onClick={() => setFilter('reviewed')} 
            className={`btn ${filter === 'reviewed' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Reviewed ({applications.filter(a => a.status === 'reviewed').length})
          </button>
          <button 
            onClick={() => setFilter('shortlisted')} 
            className={`btn ${filter === 'shortlisted' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Shortlisted ({applications.filter(a => a.status === 'shortlisted').length})
          </button>
          <button 
            onClick={() => setFilter('accepted')} 
            className={`btn ${filter === 'accepted' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Accepted ({applications.filter(a => a.status === 'accepted').length})
          </button>
          <button 
            onClick={() => setFilter('rejected')} 
            className={`btn ${filter === 'rejected' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Rejected ({applications.filter(a => a.status === 'rejected').length})
          </button>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications found</h3>
            <p>Try adjusting your filter or apply to more jobs</p>
          </div>
        ) : (
          <div className="job-list">
            {filteredApplications.map((application) => (
              <div key={application._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{application.jobId?.title}</h3>
                    <p style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>
                      {application.jobId?.company}
                    </p>
                    
                    <div className="job-meta" style={{ marginTop: '0.5rem' }}>
                      <span>📍 {application.jobId?.location}</span>
                      <span>💼 {application.jobId?.jobType}</span>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                      {application.updatedAt !== application.appliedAt && (
                        <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                          Updated on {new Date(application.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {application.notes && (
                      <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <strong>Note from employer:</strong>
                        <p style={{ marginTop: '0.25rem' }}>{application.notes}</p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <span className={`badge badge-${application.status}`}>
                      {application.status}
                    </span>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link 
                        to={`/jobs/${application.jobId?._id}`} 
                        className="btn btn-secondary"
                      >
                        View Job
                      </Link>
                      {application.status === 'pending' && (
                        <button 
                          onClick={() => handleWithdraw(application._id)}
                          className="btn btn-danger"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <strong>Your Cover Letter:</strong>
                  <p style={{ marginTop: '0.5rem', color: '#555' }}>
                    {application.coverLetter}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
