import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await api.get(`/applications/${id}`);
      setApplication(response.data.data);
      setNotes(response.data.data.notes || '');
    } catch (error) {
      console.error('Error fetching application:', error);
      setMessage({ type: 'error', text: 'Failed to load application details' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      await api.put(`/applications/${id}`, {
        status: newStatus,
        notes: notes
      });
      
      setApplication({ ...application, status: newStatus, notes: notes });
      setMessage({ type: 'success', text: 'Application status updated successfully!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update status' 
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleNotesUpdate = async () => {
    setUpdating(true);
    setMessage({ type: '', text: '' });

    try {
      await api.put(`/applications/${id}`, {
        status: application.status,
        notes: notes
      });
      
      setApplication({ ...application, notes: notes });
      setMessage({ type: 'success', text: 'Notes updated successfully!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to update notes' 
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  if (!application) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Application not found</h3>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard">
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
          ← Back
        </button>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
            <div>
              <h2>Application Review</h2>
              <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>
                Applied on {new Date(application.appliedAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`badge badge-${application.status}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {application.status}
            </span>
          </div>

          {message.text && (
            <div 
              className={message.type} 
              style={{ 
                marginBottom: '1.5rem', 
                padding: '0.75rem', 
                borderRadius: '4px', 
                backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                color: message.type === 'success' ? '#155724' : '#721c24'
              }}
            >
              {message.text}
            </div>
          )}

          {/* Job Information */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Job Details</h3>
            <h4>{application.jobId?.title}</h4>
            <div className="job-meta" style={{ marginTop: '0.5rem' }}>
              <span>📍 {application.jobId?.location}</span>
              <span>💼 {application.jobId?.jobType}</span>
              <span>📊 {application.jobId?.experienceLevel}</span>
            </div>
          </div>

          {/* Candidate Information */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Candidate Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <strong>Name:</strong>
                <p style={{ marginTop: '0.25rem' }}>{application.jobSeekerId?.name}</p>
              </div>
              <div>
                <strong>Email:</strong>
                <p style={{ marginTop: '0.25rem' }}>
                  <a href={`mailto:${application.jobSeekerId?.email}`} style={{ color: '#3498db' }}>
                    {application.jobSeekerId?.email}
                  </a>
                </p>
              </div>
              {application.jobSeekerId?.phone && (
                <div>
                  <strong>Phone:</strong>
                  <p style={{ marginTop: '0.25rem' }}>
                    <a href={`tel:${application.jobSeekerId?.phone}`} style={{ color: '#3498db' }}>
                      {application.jobSeekerId?.phone}
                    </a>
                  </p>
                </div>
              )}
            </div>

            {application.jobSeekerId?.skills && application.jobSeekerId.skills.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Skills:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {application.jobSeekerId.skills.map((skill, index) => (
                    <span key={index} className="badge" style={{ backgroundColor: '#3498db', color: 'white' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {application.jobSeekerId?.experience && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Experience:</strong>
                <p style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  {application.jobSeekerId.experience}
                </p>
              </div>
            )}

            {application.jobSeekerId?.education && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Education:</strong>
                <p style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  {application.jobSeekerId.education}
                </p>
              </div>
            )}

            {application.resume && (
              <div style={{ marginTop: '1rem' }}>
                <a 
                  href={application.resume} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  📄 View Resume
                </a>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Cover Letter</h3>
            <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', lineHeight: '1.8' }}>
              {application.coverLetter}
            </div>
          </div>

          {/* Employer Notes */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Your Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Add notes about this candidate..."
            />
            <button 
              onClick={handleNotesUpdate}
              className="btn btn-secondary"
              style={{ marginTop: '0.5rem' }}
              disabled={updating}
            >
              {updating ? 'Saving...' : 'Save Notes'}
            </button>
          </div>

          {/* Action Buttons */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Update Application Status</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {application.status === 'pending' && (
                <>
                  <button 
                    onClick={() => handleStatusUpdate('reviewed')}
                    className="btn btn-secondary"
                    disabled={updating}
                  >
                    Mark as Reviewed
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('shortlisted')}
                    className="btn btn-success"
                    disabled={updating}
                  >
                    Shortlist
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('rejected')}
                    className="btn btn-danger"
                    disabled={updating}
                  >
                    Reject
                  </button>
                </>
              )}

              {application.status === 'reviewed' && (
                <>
                  <button 
                    onClick={() => handleStatusUpdate('shortlisted')}
                    className="btn btn-success"
                    disabled={updating}
                  >
                    Shortlist
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('rejected')}
                    className="btn btn-danger"
                    disabled={updating}
                  >
                    Reject
                  </button>
                </>
              )}

              {application.status === 'shortlisted' && (
                <>
                  <button 
                    onClick={() => handleStatusUpdate('accepted')}
                    className="btn btn-success"
                    disabled={updating}
                  >
                    Accept Candidate
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('rejected')}
                    className="btn btn-danger"
                    disabled={updating}
                  >
                    Reject
                  </button>
                </>
              )}

              {(application.status === 'accepted' || application.status === 'rejected') && (
                <div style={{ padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
                  <strong>This application has been {application.status}.</strong>
                  <p style={{ marginTop: '0.5rem' }}>
                    To change the status, use the buttons above or contact the candidate directly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
