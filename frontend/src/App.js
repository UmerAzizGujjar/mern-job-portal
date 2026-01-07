import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';

// Job Seeker Pages
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import MyApplications from './pages/MyApplications';

// Employer Pages
import EmployerDashboard from './pages/EmployerDashboard';
import PostJob from './pages/PostJob';
import ManageJobs from './pages/ManageJobs';
import JobApplications from './pages/JobApplications';
import ApplicationDetails from './pages/ApplicationDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* Job Seeker Routes */}
            <Route
              path="/jobseeker/dashboard"
              element={
                <PrivateRoute role="jobseeker">
                  <JobSeekerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobseeker/applications"
              element={
                <PrivateRoute role="jobseeker">
                  <MyApplications />
                </PrivateRoute>
              }
            />

            {/* Employer Routes */}
            <Route
              path="/employer/dashboard"
              element={
                <PrivateRoute role="employer">
                  <EmployerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employer/post-job"
              element={
                <PrivateRoute role="employer">
                  <PostJob />
                </PrivateRoute>
              }
            />
            <Route
              path="/employer/jobs"
              element={
                <PrivateRoute role="employer">
                  <ManageJobs />
                </PrivateRoute>
              }
            />
            <Route
              path="/employer/jobs/:id"
              element={
                <PrivateRoute role="employer">
                  <JobDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/employer/jobs/:jobId/applications"
              element={
                <PrivateRoute role="employer">
                  <JobApplications />
                </PrivateRoute>
              }
            />
            <Route
              path="/employer/applications/:id"
              element={
                <PrivateRoute role="employer">
                  <ApplicationDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
