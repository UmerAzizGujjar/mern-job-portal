import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    experienceLevel: ''
  });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await api.get(`/jobs?${queryParams.toString()}`);
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>🔍 Discover Your Next Opportunity</h2>
          <p style={{ color: '#6B7280', fontSize: '1.05rem', marginTop: '0.5rem' }}>
            Browse through {jobs.length}+ job openings from top companies
          </p>
        </div>

        <div className="search-filters">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#1F2937',
              fontSize: '0.95rem'
            }}>
              🔎 Search Jobs
            </label>
            <input
              type="text"
              name="search"
              placeholder="Search by job title, company, or keywords..."
              value={filters.search}
              onChange={handleFilterChange}
              style={{ marginBottom: '0' }}
            />
          </div>
          
          <div className="filters-row">
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: '#1F2937',
                fontSize: '0.9rem'
              }}>
                📍 Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="City, State, or Remote"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: '#1F2937',
                fontSize: '0.9rem'
              }}>
                💼 Job Type
              </label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
              >
                <option value="">All Job Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600', 
                color: '#1F2937',
                fontSize: '0.9rem'
              }}>
                📊 Experience Level
              </label>
              <select
                name="experienceLevel"
                value={filters.experienceLevel}
                onChange={handleFilterChange}
              >
                <option value="">All Experience Levels</option>
                <option value="entry">Entry Level</option>
                <option value="intermediate">Intermediate</option>
                <option value="senior">Senior</option>
                <option value="executive">Executive</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <div>Searching for amazing opportunities...</div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
            <h3>No jobs found</h3>
            <p>Try adjusting your search criteria to find more opportunities</p>
          </div>
        ) : (
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job._id} className="card job-card">
                <div className="job-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ marginBottom: '0.25rem' }}>{job.title}</h3>
                      <p className="job-company">🏢 {job.company}</p>
                    </div>
                    <span className={`badge badge-${job.status}`}>{job.status}</span>
                  </div>
                  
                  <div className="job-meta" style={{ marginTop: '1rem' }}>
                    <span>📍 {job.location}</span>
                    <span>💼 {job.jobType}</span>
                    <span>📊 {job.experienceLevel}</span>
                    {job.salary?.min && (
                      <span>
                        💰 {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <p style={{ marginTop: '1rem', color: '#6B7280', lineHeight: '1.6' }}>
                    {job.description.substring(0, 200)}...
                  </p>
                  
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      color: '#6B7280', 
                      fontSize: '0.9rem',
                      background: '#F3F4F6',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      fontWeight: '500'
                    }}>
                      👥 {job.applicationsCount} applications
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
