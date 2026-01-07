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
          <h2>Browse Jobs</h2>
        </div>

        <div className="search-filters">
          <input
            type="text"
            name="search"
            placeholder="Search by job title, company, or keywords..."
            value={filters.search}
            onChange={handleFilterChange}
          />
          
          <div className="filters-row">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
            />
            
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

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job._id} className="card job-card">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p style={{ color: '#7f8c8d', marginBottom: '0.5rem' }}>{job.company}</p>
                  
                  <div className="job-meta">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.jobType}</span>
                    <span>📊 {job.experienceLevel}</span>
                    {job.salary?.min && (
                      <span>
                        💰 {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <p style={{ marginTop: '1rem', color: '#555' }}>
                    {job.description.substring(0, 200)}...
                  </p>
                  
                  <div style={{ marginTop: '0.5rem' }}>
                    <span className={`badge badge-${job.status}`}>{job.status}</span>
                    <span style={{ marginLeft: '0.5rem', color: '#7f8c8d' }}>
                      {job.applicationsCount} applications
                    </span>
                  </div>
                </div>
                
                <div>
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                    View Details
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
