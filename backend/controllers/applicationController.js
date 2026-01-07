const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Submit job application
// @route   POST /api/applications
// @access  Private (Job Seeker only)
exports.createApplication = async (req, res, next) => {
  try {
    const { jobId, coverLetter, resume } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      jobSeekerId: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this job'
      });
    }

    // Create application
    const application = await Application.create({
      jobId,
      jobSeekerId: req.user.id,
      employerId: job.employerId,
      coverLetter,
      resume: resume || req.user.resume
    });

    // Increment applications count on job
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationsCount: 1 }
    });

    res.status(201).json({
      success: true,
      data: application
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get job seeker's applications
// @route   GET /api/applications/my-applications
// @access  Private (Job Seeker only)
exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobSeekerId: req.user.id })
      .populate('jobId', 'title company location jobType salary status')
      .populate('employerId', 'name companyName email')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get applications for a specific job (Employer)
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer only)
exports.getJobApplications = async (req, res, next) => {
  try {
    // Check if job belongs to employer
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.employerId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view these applications'
      });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('jobSeekerId', 'name email phone skills experience education resume')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all applications for employer's jobs
// @route   GET /api/applications/employer/all
// @access  Private (Employer only)
exports.getEmployerApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ employerId: req.user.id })
      .populate('jobId', 'title company location jobType')
      .populate('jobSeekerId', 'name email phone skills experience')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if application belongs to employer's job
    if (application.employerId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    const { status, notes } = req.body;

    application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    ).populate('jobSeekerId', 'name email phone');

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single application details
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('jobId')
      .populate('jobSeekerId', 'name email phone skills experience education resume')
      .populate('employerId', 'name companyName email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user is authorized to view this application
    if (
      application.jobSeekerId._id.toString() !== req.user.id &&
      application.employerId._id.toString() !== req.user.id
    ) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this application'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Withdraw application
// @route   DELETE /api/applications/:id
// @access  Private (Job Seeker only)
exports.withdrawApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if application belongs to user
    if (application.jobSeekerId.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to withdraw this application'
      });
    }

    await application.deleteOne();

    // Decrement applications count on job
    await Job.findByIdAndUpdate(application.jobId, {
      $inc: { applicationsCount: -1 }
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
