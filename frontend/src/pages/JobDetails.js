import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isJobSeeker } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchJob = useCallback(async () => {
    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data.data);
    } catch (error) {
      console.error('Error fetching job:', error);
      setMessage({ type: 'error', text: 'Failed to load job details' });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setApplying(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/applications', {
        jobId: id,
        ...applicationData
      });
      setMessage({ type: 'success', text: 'Application submitted successfully!' });
      setShowApplicationForm(false);
      setTimeout(() => navigate('/jobseeker/applications'), 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to submit application' 
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  if (!job) {
    return <div className="container"><div className="empty-state"><h3>Job not found</h3></div></div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
          ← Back
        </button>

        <div className="card">
          <h2>{job.title}</h2>
          <p style={{ fontSize: '1.2rem', color: '#7f8c8d', marginBottom: '1rem' }}>{job.company}</p>
          
          <div className="job-meta" style={{ marginBottom: '1.5rem' }}>
            <span>📍 {job.location}</span>
            <span>💼 {job.jobType}</span>
            <span>📊 {job.experienceLevel}</span>
            {job.salary?.min && (
              <span>
                💰 {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span className={`badge badge-${job.status}`}>{job.status}</span>
            <span style={{ marginLeft: '0.5rem', color: '#7f8c8d' }}>
              {job.applicationsCount} applications
            </span>
          </div>

          {message.text && (
            <div className={message.type} style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '4px', backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da' }}>
              {message.text}
            </div>
          )}

          {isJobSeeker && !showApplicationForm && (
            <button 
              onClick={() => setShowApplicationForm(true)} 
              className="btn btn-success"
              style={{ marginBottom: '1.5rem' }}
            >
              Apply Now
            </button>
          )}

          {showApplicationForm && (
            <div style={{ marginBottom: '1.5rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Submit Your Application</h3>
              <form onSubmit={handleApplicationSubmit}>
                <div className="form-group">
                  <label>Cover Letter *</label>
                  <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                    rows="6"
                    required
                    placeholder="Tell us why you're a great fit for this position..."
                  />
                </div>

                <div className="form-group">
                  <label>Resume Link (Optional)</label>
                  <input
                    type="url"
                    value={applicationData.resume}
                    onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-success" disabled={applying}>
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowApplicationForm(false)} 
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div>
            <h3>Job Description</h3>
            <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Requirements</h3>
              <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                {job.requirements.map((req, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Responsibilities</h3>
              <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                {job.responsibilities.map((resp, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {job.skills && job.skills.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Required Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {job.skills.map((skill, index) => (
                  <span key={index} className="badge badge-primary" style={{ backgroundColor: '#3498db' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Benefits</h3>
              <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                {job.benefits.map((benefit, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {job.applicationDeadline && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
              <strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
