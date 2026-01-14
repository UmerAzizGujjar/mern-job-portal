import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: user?.companyName || '',
    location: '',
    jobType: 'full-time',
    experienceLevel: 'entry',
    salaryMin: '',
    salaryMax: '',
    currency: 'PKR',
    skills: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    applicationDeadline: '',
    status: 'active'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        salary: {
          min: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
          max: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
          currency: formData.currency
        },
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        requirements: formData.requirements ? formData.requirements.split('\n').filter(r => r.trim()) : [],
        responsibilities: formData.responsibilities ? formData.responsibilities.split('\n').filter(r => r.trim()) : [],
        benefits: formData.benefits ? formData.benefits.split('\n').filter(b => b.trim()) : []
      };

      await api.post('/jobs', jobData);
      navigate('/employer/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="dashboard">
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
          ← Back
        </button>

        <div className="form-container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Post a New Job</h2>

          {error && <div className="error" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY or Remote"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Job Type *</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              <div className="form-group">
                <label>Experience Level *</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="senior">Senior</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Job Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Min Salary</label>
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                />
              </div>

              <div className="form-group">
                <label>Max Salary</label>
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="e.g., 80000"
                />
              </div>

              <div className="form-group">
                <label>Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="PKR">PKR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Required Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            <div className="form-group">
              <label>Requirements (one per line)</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="5"
                placeholder="Enter each requirement on a new line"
              />
            </div>

            <div className="form-group">
              <label>Responsibilities (one per line)</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows="5"
                placeholder="Enter each responsibility on a new line"
              />
            </div>

            <div className="form-group">
              <label>Benefits (one per line)</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows="4"
                placeholder="Enter each benefit on a new line"
              />
            </div>

            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
