const express = require('express');
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  getJobApplications,
  getEmployerApplications,
  updateApplicationStatus,
  getApplication,
  withdrawApplication
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

// Job Seeker routes
router.post('/', protect, authorize('jobseeker'), createApplication);
router.get('/my-applications', protect, authorize('jobseeker'), getMyApplications);
router.delete('/:id', protect, authorize('jobseeker'), withdrawApplication);

// Employer routes
router.get('/job/:jobId', protect, authorize('employer'), getJobApplications);
router.get('/employer/all', protect, authorize('employer'), getEmployerApplications);
router.put('/:id', protect, authorize('employer'), updateApplicationStatus);

// Shared routes
router.get('/:id', protect, getApplication);

module.exports = router;
