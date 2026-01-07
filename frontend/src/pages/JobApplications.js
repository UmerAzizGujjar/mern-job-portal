import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchData = useCallback(async () => {
    try {
      const [jobResponse, applicationsResponse] = await Promise.all([
        api.get(`/jobs/${jobId}`),
        api.get(`/applications/job/${jobId}`)
      ]);
      
      setJob(jobResponse.data.data);
      setApplications(applicationsResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusUpdate = async (applicationId, status, notes = '') => {
    try {
      await api.put(`/applications/${applicationId}`, { status, notes });
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status, notes } : app
      ));
    } catch (error) {
      alert('Failed to update application status');
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
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
          ← Back
        </button>

        <div className="dashboard-header">
          <div>
            <h2>Applications for: {job?.title}</h2>
            <p style={{ color: '#7f8c8d' }}>Total: {applications.length} applications</p>
          </div>
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
            <p>Try adjusting your filter</p>
          </div>
        ) : (
          <div className="job-list">
            {filteredApplications.map((application) => (
              <div key={application._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3>{application.jobSeekerId?.name}</h3>
                    <p style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>
                      📧 {application.jobSeekerId?.email}
                    </p>
                    {application.jobSeekerId?.phone && (
                      <p style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>
                        📱 {application.jobSeekerId?.phone}
                      </p>
                    )}

                    {application.jobSeekerId?.skills && application.jobSeekerId.skills.length > 0 && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <strong>Skills:</strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                          {application.jobSeekerId.skills.map((skill, index) => (
                            <span key={index} className="badge" style={{ backgroundColor: '#3498db', color: 'white' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {application.jobSeekerId?.experience && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <strong>Experience:</strong>
                        <p style={{ marginTop: '0.25rem' }}>{application.jobSeekerId.experience}</p>
                      </div>
                    )}

                    {application.jobSeekerId?.education && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <strong>Education:</strong>
                        <p style={{ marginTop: '0.25rem' }}>{application.jobSeekerId.education}</p>
                      </div>
                    )}

                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                      <strong>Cover Letter:</strong>
                      <p style={{ marginTop: '0.5rem', color: '#555' }}>{application.coverLetter}</p>
                    </div>

                    {application.resume && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <a href={application.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                          📄 View Resume
                        </a>
                      </div>
                    )}

                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                      Applied on {new Date(application.appliedAt).toLocaleDateString()}
                    </p>

                    {application.notes && (
                      <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
                        <strong>Your notes:</strong>
                        <p style={{ marginTop: '0.25rem' }}>{application.notes}</p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '150px' }}>
                    <span className={`badge badge-${application.status}`} style={{ textAlign: 'center' }}>
                      {application.status}
                    </span>

                    <Link 
                      to={`/employer/applications/${application._id}`} 
                      className="btn btn-primary"
                    >
                      Full Details
                    </Link>

                    {application.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(application._id, 'reviewed')}
                          className="btn btn-secondary"
                        >
                          Mark Reviewed
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                          className="btn btn-success"
                        >
                          Shortlist
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(application._id, 'rejected')}
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {application.status === 'reviewed' && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                          className="btn btn-success"
                        >
                          Shortlist
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(application._id, 'rejected')}
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {application.status === 'shortlisted' && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(application._id, 'accepted')}
                          className="btn btn-success"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(application._id, 'rejected')}
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default JobApplications;
